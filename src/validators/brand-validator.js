const { body, param } = require("express-validator");
const db = require("../models");
const Brand = db.Brand;

// Create validator rules
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

// Update validator rules
exports.updateBrandValidationRules = [
	param("id").notEmpty().withMessage("Brand id is required"),
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

// Check value brand id
exports.getBrandIdRules = [param("id").notEmpty().withMessage("Brand id is required")];
