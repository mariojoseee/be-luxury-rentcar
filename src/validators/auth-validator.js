const { body } = require("express-validator");

// Register validation rules
exports.registerValidationRules = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
	body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Login validation rules
exports.loginValidationRules = [body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"), body("password").notEmpty().withMessage("Password is required")];
