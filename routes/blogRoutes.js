const express = require("express");
const multer = require("multer");
const {
  addBlogPageHandler,
  addBlogHandler,
  uniqueblogPageHandler,
  postCommentHandler,
} = require("../controllers/blogController");

const router = express.Router();

//code to store image in the local storage
//documentation:https://www.npmjs.com/package/multer
// const storage = multer.diskStorage({
//   destination: "./public/uploads", //if destination is given as a string a folder will be formed automatically but if a calllback function is given then user have to form the folder
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const upload = multer({});

router.get("/add", addBlogPageHandler);
router.get("/:id", uniqueblogPageHandler);

router.post("/add", upload.single("coverImage"), addBlogHandler);
router.post("/comment/:blogId", postCommentHandler);

module.exports = router;
