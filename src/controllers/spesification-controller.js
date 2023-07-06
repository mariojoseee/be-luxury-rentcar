const { Spesification, Car, sequelize } = require("../models");
const { validationResult } = require("express-validator");

// READ ALL CAR SPESIFICATION ON CAR ID
exports.getSpesificationCarById = async (req, res) => {
	try {
		// Menangkap Car Id untuk dilakukan query
		const { id_car } = req.params;
		const spesificationCar = await Spesification.findAll({ where: { car_id: id_car } });

		if (spesificationCar) {
			return res.status(200).json({ message: "Get Spesification Car by ID Success", spesificationCar });
		} else {
			return res.status(404).json({ message: "Spesification car not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// CREATE CAR SPESIFICATION
exports.createSpesification = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { text } = req.body;
		const { id_car } = req.params;

		// Make sure car_id
		const carId = await Car.findByPk(id_car);
		if (!carId) {
			return res.status(404).json({ error: "Car id not found" });
		}

		const input = await Spesification.create({ text, car_id: id_car });

		return res.status(201).json({ message: "Create Spesification Success", input });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// DELETE CAR SPESIFICATION
exports.deleteSpesification = async (req, res) => {
	try {
		const { id } = req.params;

		const spec = await Spesification.findByPk(id);

		if (spec) {
			await spec.destroy();

			return res.status(200).json({ message: "Spesification deleted successfully" });
		} else {
			return res.status(404).json({ message: "Spesification not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE CAR SPESIFICATION
exports.updateSpesification = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { text } = req.body;

		const spec = await Spesification.findByPk(id);
		if (!spec) {
			return res.status(404).json({ error: "Car spesification not found" });
		}

		spec.text = text;
		await spec.save();

		return res.status(200).json({ message: "Update Car Spesification Success", spec });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
