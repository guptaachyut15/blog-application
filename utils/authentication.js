const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config");

exports.createTokenfromUser = (user) => {
  let payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    profileImageUrl: user.profileImageurl,
  };
  const token = jwt.sign(payload, JWTSECRET);
  return token;
};

exports.validateToken = (token) => {
  const payload = jwt.verify(token, JWTSECRET);
  return payload;
};
