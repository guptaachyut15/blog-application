const Blog = require("../models/blogs");

exports.homePageHandler = async (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return res.render("home", { user: req.user, blogs: blogs });
};
