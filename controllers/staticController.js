exports.homePageHandler = (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  console.log(req.user);
  return res.render("home", { user: req.user });
};
