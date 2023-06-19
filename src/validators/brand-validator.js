const { body } = require("express-validator");
const db = require("../models");
const Brand = db.Brand;

// Brand validation rules
exports.createBrandValidationRules = [
	body("name")
		.notEmpty()
		.withMessage("Brand name is required")
		.custom(async (value) => {
			// Check brand with the same name already exists
			const brand = await Brand.findOne({
				where: {
					name: value,
				},
			});

			if (brand) {
				throw new Error("The brand name entered already exists!");
			}

			return true;
		}),
];

exports.updateBrandValidationRules = [
	body("name")
		.notEmpty()
		.withMessage("Brand name is required")
		.custom(async (value, { req }) => {
			const brandId = req.params.id;

			// Check if brand with the same name already exists
			const brand = await Brand.findOne({
				where: {
					name: value,
					id: { [db.Sequelize.Op.ne]: brandId },
				},
			});

			if (brand) {
				throw new Error("The brand name entered already exists!");
			}

			return true;
		}),
];
