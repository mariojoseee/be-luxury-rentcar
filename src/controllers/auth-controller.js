const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { validationResult } = require("express-validator");

// 1. REGISTER USER
exports.registerUser = async (req, res) => {
	// Validate user input
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// Check if user with the same email already exists
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Email is already registered" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Insert data user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		// Return the user data
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
