const { body, param } = require("express-validator");
const db = require("../models");
const Payment = db.Payment;

// Create validator rules
exports.createPaymentValidationRules = [
	body("admin_fee").notEmpty().withMessage("Admin fee is required").isInt().withMessage("Admin fee must be a number"),
	body("name")
		.notEmpty()
		.withMessage("Payment name is required")
		.custom(async (value) => {
			const payment = await Payment.findOne({
				where: {
					name: value,
				},
			});

			if (payment) {
				throw new Error("The payment name entered already exists!");
			}

			return true;
		}),
];

// Update validator rules
exports.updatePaymentValidationRules = [
	param("id").notEmpty().withMessage("Payment id is required"),
	body("admin_fee").notEmpty().withMessage("Admin fee is required").isInt().withMessage("Admin fee must be a number"),
	body("name")
		.notEmpty()
		.withMessage("Payment name is required")
		.custom(async (value, { req }) => {
			const paymentId = req.params.id;

			const payment = await Payment.findOne({
				where: {
					name: value,
					id: { [db.Sequelize.Op.ne]: paymentId },
				},
			});

			if (payment) {
				throw new Error("The payment name entered already exists!");
			}

			return true;
		}),
];
