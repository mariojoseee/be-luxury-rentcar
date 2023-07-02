const { body } = require("express-validator");
const db = require("../models");
const User = db.User;

// Register validation rules
exports.registerValidationRules = [
	body("name").notEmpty().withMessage("Name is required"),
	body("username").notEmpty().withMessage("Username is required"),
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
	body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Login validation rules
exports.loginValidationRules = [body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"), body("password").notEmpty().withMessage("Password is required")];

// Update profile user
exports.updateUserValidationRules = [
	body("name").notEmpty().withMessage("Name is required"),
	body("username")
		.notEmpty()
		.withMessage("Username is required")
		.custom(async (value, { req }) => {
			const userId = req.User.userId;

			// Check if username already exists
			const user = await User.findOne({
				where: {
					username: value,
					id: { [db.Sequelize.Op.ne]: userId },
				},
			});

			if (user) {
				throw new Error("Username is already in use!");
			}

			return true;
		}),
	body("phone_number")
		.notEmpty()
		.withMessage("Phone number is required")
		.custom(async (value, { req }) => {
			const userId = req.User.userId;

			// Check if phone number already exists
			const user = await User.findOne({
				where: {
					phone_number: value,
					id: { [db.Sequelize.Op.ne]: userId },
				},
			});

			if (user) {
				throw new Error("Phone number is already in use!");
			}

			return true;
		}),
];
