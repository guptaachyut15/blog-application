const express = require("express");
const {
  signUpHandler,
  signInHandler,
  signInPageHandler,
  signUpPageHandler,
  signOutPageHandler,
  profilePageHandler,
} = require("../controllers/userController");

const router = express.Router();

router.get("/signup", signUpPageHandler);
router.get("/signin", signInPageHandler);
router.get("/signout", signOutPageHandler);
router.get("/profile", profilePageHandler);

router.post("/signup", signUpHandler);
router.post("/signin", signInHandler);

module.exports = router;
