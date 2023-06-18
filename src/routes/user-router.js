const express = require("express");
const { registerUser, login, verifyToken } = require("../controllers/auth-controller");
const { registerValidationRules, loginValidationRules } = require("../validators/auth-validator");
const profileController = require("../controllers/profile-controller");

const router = express.Router();

router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, login);
router.get("/get-profile", verifyToken, profileController.getProfile);

module.exports = router;
