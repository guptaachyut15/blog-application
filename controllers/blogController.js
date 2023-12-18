const Blog = require("../models/blogs");

exports.addBlogPageHandler = (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  return res.render("add-blog", { user: req.user });
};

exports.uniqueblogPageHandler = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", { user: req.user, blog });
};

exports.addBlogHandler = async (req, res) => {
  const { title, blogText } = req.body;
  const blog = await Blog.create({
    title: title,
    body: blogText,
    coverImageURL: `/uploads/${req.file?.filename}`,
    createdBy: req.user._id,
  });
  return res.render("blog", {
    message: `Blog uploaded successfully`,
    blog: blog,
  });
};
