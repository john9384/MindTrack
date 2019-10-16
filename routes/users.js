const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// The login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// The user registration route
router.get("/register", (req, res) => {
  res.render("users/register");
});

module.exports = router;
