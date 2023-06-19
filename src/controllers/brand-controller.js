const { Brand } = require("../models");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

// CREATE BRAND
exports.createBrand = async (req, res) => {
	try {
		// Validate input brand
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name } = req.body;

		const input = await Brand.create({ name });

		return res.status(201).json({ message: "Create Brand Success", input });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ ALL BRANDS
exports.getAllBrands = async (req, res) => {
	try {
		const brands = await Brand.findAll();

		return res.status(200).json({ message: "Get All Brand Success", brands });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ SINGLE BRAND
exports.getBrandById = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieving the brand based on the ID from the database
		const brand = await Brand.findByPk(id);

		if (brand) {
			return res.status(200).json({ message: "Get Brand by ID Success", brand });
		} else {
			return res.status(404).json({ message: "Brand not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE BRAND
exports.updateBrand = async (req, res) => {
	try {
		// Validate update brand
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { name } = req.body;

		// Retrieving the brand based on the ID from the database
		const brand = await Brand.findByPk(id);

		// Update brand with new name
		if (brand) {
			brand.name = name;
			await brand.save();

			return res.status(200).json({ message: "Update Brand Success", brand });
		} else {
			return res.status(404).json({ message: "Brand not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// Delete brand
exports.deleteBrand = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieving the brand based on the ID from the database
		const brand = await Brand.findByPk(id);

		if (brand) {
			await brand.destroy();

			return res.status(200).json({ message: "Brand deleted successfully" });
		} else {
			return res.status(404).json({ message: "Brand not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
