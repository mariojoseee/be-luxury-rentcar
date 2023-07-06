const { body } = require("express-validator");
const db = require("../models");
const Spesification = db.Car;

// Validator rules
exports.spesificationValidationRules = [body("text").notEmpty().withMessage("Text spesification is required")];
