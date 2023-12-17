const express = require("express");
const { homePageHandler } = require("../controllers/staticController");

const router = express.Router();

router.get("/", homePageHandler);

module.exports = router;
