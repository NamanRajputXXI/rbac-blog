const express = require("express");
const router = express.Router();
const { signup } = require("../controller/user.controller");

// Signup route
router.post("/signup", signup);

module.exports = router;
