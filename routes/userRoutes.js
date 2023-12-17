const express = require("express");
const {
  signUpHandler,
  signInHandler,
  signInPageHandler,
  signUpPageHandler,
  signOutPageHandler,
} = require("../controllers/userController");

const router = express.Router();

router.get("/signup", signUpPageHandler);
router.get("/signin", signInPageHandler);
router.get("/signout", signOutPageHandler);

router.post("/signup", signUpHandler);
router.post("/signin", signInHandler);

module.exports = router;
