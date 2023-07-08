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

	const { username, name, email, password } = req.body;

	try {
		// Check if email already exists
		const existingEmail = await User.findOne({ where: { email } });
		if (existingEmail) {
			return res.status(400).json({ message: "Email is already registered" });
		}

		// Check if username already exists
		const existingUsername = await User.findOne({ where: { username } });
		if (existingUsername) {
			return res.status(400).json({ message: "Username is already registered" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Insert data user
		const user = await User.create({
			username,
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

// 2. LOGIN USER & ADMIN
exports.login = async (req, res) => {
	// Validate user input
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// Find the user by email
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Check the password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "5h" });

		// Check user role
		if (user.role === "admin") {
			return res.status(200).json({ token, name: user.name, role: user.role, message: "Admin login successful" });
		} else if (user.role === "user") {
			return res.status(200).json({ token, name: user.name, role: user.role, message: "User login successful" });
		} else {
			return res.status(401).json({ message: "Unauthorized role" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// 3. Authorization JSON Web Token
exports.verifyToken = async (req, res, next) => {
	try {
		// Get jwt token from the request headers
		const jwtToken = req.headers["authorization"];

		if (!jwtToken) {
			return res.status(400).send({
				message: "No JWT Token Provided",
			});
		}

		// Verify the token
		const verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_SECRET_KEY);
		if (!verify) {
			return res.status(403).send({
				message: "Failed to Authentication JWT Token",
			});
		}

		// Set user ID in the request object for further use
		req.User = verify;

		// Continue to the next route handler
		next();
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error,
		});
	}
};

// 3. Verifikasi Role Admin
exports.verifyAdmin = async (req, res, next) => {
	try {
		if (req.User.role !== "admin") {
			return res.status(403).send({
				message: "You not authorized, this endpoint for admin",
			});
		}

		next();
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
