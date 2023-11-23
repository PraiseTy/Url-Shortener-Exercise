const express = require("express");
const { createNewUsers, loginUser } = require("../controllers/users");

const router = express.Router();

router.post("/users", createNewUsers);
router.post("/login", loginUser);

module.exports = router;
