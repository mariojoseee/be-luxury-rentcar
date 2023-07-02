const { Payment } = require("../models");
const { validationResult } = require("express-validator");

// CREATE PAYMENT
exports.createPayment = async (req, res) => {
	try {
		// Validate input payment
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, admin_fee } = req.body;

		const input = await Payment.create({ name, admin_fee });

		return res.status(201).json({ message: "Create Payment Success", input });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ ALL PAYMENTS
exports.getAllPayments = async (req, res) => {
	try {
		const payments = await Payment.findAll();

		return res.status(200).json({ message: "Get All Payments Success", payments });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ SINGLE PAYMENT
exports.getPaymentById = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieving the payment based on the ID from the database
		const payment = await Payment.findByPk(id);

		if (payment) {
			return res.status(200).json({ message: "Get Payment by ID Success", payment });
		} else {
			return res.status(404).json({ message: "Payment not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE PAYMENT
exports.updatePayment = async (req, res) => {
	try {
		// Validate update payment
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { name, admin_fee } = req.body;

		// Retrieving the payment based on the ID from the database
		const payment = await Payment.findByPk(id);

		// Update payment with new name
		if (payment) {
			payment.name = name;
			payment.admin_fee = admin_fee;
			await payment.save();

			return res.status(200).json({ message: "Update Payment Success", payment });
		} else {
			return res.status(404).json({ message: "Payment not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// DELETE PAYMENT
exports.deletePayment = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieving the payment based on the ID from the database
		const payment = await Payment.findByPk(id);

		if (payment) {
			await payment.destroy();

			return res.status(200).json({ message: "Payment deleted successfully" });
		} else {
			return res.status(404).json({ message: "Payment not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
