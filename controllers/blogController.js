const Blog = require("../models/blogs");
const Comment = require("../models/comments");

exports.addBlogPageHandler = (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  return res.render("add-blog", { user: req.user });
};

exports.uniqueblogPageHandler = async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId).populate("createdBy");
  const comments = await Comment.find({ blogId }).populate("createdBy");
  return res.render("blog", { user: req.user, blog, comments });
};

exports.addBlogHandler = async (req, res) => {
  const { title, blogText } = req.body;
  const encoded = req.file.buffer.toString("base64");
  const blog = await Blog.create({
    title: title,
    body: blogText,
    coverImageURL: encoded,
    createdBy: req.user._id,
  });
  return res.render("blog", {
    message: `Blog uploaded successfully`,
    blog: blog,
  });
};

exports.postCommentHandler = async (req, res) => {
  const blogId = req.params.blogId;
  const { content } = req.body;
  await Comment.create({ content, blogId, createdBy: req.user._id });
  res.redirect(`/blog/${blogId}`);
};
