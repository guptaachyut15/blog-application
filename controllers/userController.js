const User = require("../models/users");

exports.signUpPageHandler = (req, res) => {
  return res.render("signup");
};

exports.signInPageHandler = (req, res) => {
  return res.render("signin");
};

exports.signOutPageHandler = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

exports.profilePageHandler = async (req, res) => {
  res.render("profile", { user: req.user });
};

exports.signUpHandler = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({ fullName, email, password });
    return res.redirect("/user/signin");
  } catch (err) {
    res.render("signup", { error: "User already exist" });
  }
};

exports.signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await User.matchPasswordAndReturnToken(email, password);
    return res.cookie("token", jwtToken).redirect("/");
  } catch (err) {
    console.log(err.message);
    res.render("signin", { error: err.message });
  }
};
