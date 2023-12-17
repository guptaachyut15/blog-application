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

exports.signUpHandler = (req, res) => {
  const { fullName, email, password } = req.body;
  User.create({ fullName, email, password });
  return res.redirect("/user/signin");
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
