const { param, body } = require("express-validator");
const db = require("../models");
const Car = db.Car;

// Create validator rules
exports.createCarValidationRules = [body("name").notEmpty().withMessage("Car name is required"), body("price").notEmpty().withMessage("Price is required").isInt().withMessage("Price must be a number"), body("brand_id").notEmpty().withMessage("Brand id is required")];

// Update validator rules
exports.updateCarValidationRules = [
	param("id").notEmpty().withMessage("Car id is required"),
	body("name").notEmpty().withMessage("Car name is required"),
	body("price").notEmpty().withMessage("Price is required").isInt().withMessage("Price must be a number"),
	body("brand_id").notEmpty().withMessage("Brand id is required"),
];

// Check value car id
exports.getCarIdRules = [param("id").notEmpty().withMessage("Car id is required")];
