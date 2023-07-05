const { param, body } = require("express-validator");
const db = require("../models");
const moment = require("moment");
const Transaction = db.Transaction;

// Create validator rules
exports.createTransactionValidationRules = [
	body("start_date")
		.notEmpty()
		.withMessage("Start date is required")
		.isDate()
		.withMessage("Start date must be a valid date")
		.custom((value, { req }) => {
			const currentDate = moment().startOf("day");
			const startDate = moment(value).startOf("day");
			if (startDate.isBefore(currentDate)) {
				throw new Error("Start date cannot be before today");
			}
			return true;
		}),
	body("end_date")
		.notEmpty()
		.withMessage("End date is required")
		.isDate()
		.withMessage("End date must be a valid date")
		.custom((value, { req }) => {
			const startDate = moment(req.body.start_date).startOf("day");
			const endDate = moment(value).startOf("day");
			if (endDate.isBefore(startDate)) {
				throw new Error("End date cannot be before start date");
			}
			if (startDate.isSame(endDate)) {
				throw new Error("Start date and end date cannot be the same");
			}
			return true;
		}),
];
