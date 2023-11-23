const express = require("express");
const { createShortUrl, getAllUrls } = require("../controllers/urls");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();

router.post("/shorten", authenticateUser, createShortUrl); //only loggedin users can shorten urls
router.get("/urls", getAllUrls);

module.exports = router;
