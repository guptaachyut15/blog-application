const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const { createTokenfromUser } = require("../utils/authentication");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageurl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.password = hashedPassword;
  this.salt = salt;
  next();
});

userSchema.static(
  "matchPasswordAndReturnToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("No user found with email", email);
    }
    const salt = user.salt;
    const userPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedHash != userPassword) {
      throw new Error("Incorrect password");
    }
    const token = createTokenfromUser(user);
    return token;
  }
);

const User = model("user", userSchema);

module.exports = User;
