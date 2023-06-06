const express = require("express");
const { registerUser } = require("../controllers/auth-controller");
const { registerValidationRules } = require("../validators/auth-validator");

const router = express.Router();

// Register route with validation
router.post("/register", registerValidationRules, registerUser);

module.exports = router;
