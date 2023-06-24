const { Brand, Car, sequelize } = require("../models");
const { validationResult } = require("express-validator");

// CREATE CAR
exports.createCar = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, price, brand_id } = req.body;

		// Make sure brand_id
		const brand = await Brand.findByPk(brand_id);
		if (!brand) {
			return res.status(404).json({ error: "Brand not found" });
		}

		const input = await Car.create({ name, price, brand_id });

		return res.status(201).json({ message: "Create Car Success", input });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ ALL CAR
exports.getAllCars = async (req, res) => {
	try {
		const cars = await Car.findAll({
			attributes: ["id", "name", [sequelize.literal("`Brand`.`name`"), "name_brand"], "price", "brand_id", "createdAt", "updatedAt"],
			raw: true,
			include: [
				{
					model: Brand,
					attributes: [],
				},
			],
		});

		return res.status(200).json({ message: "Get All Cars Success", cars });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ SINGLE CAR
exports.getCarById = async (req, res) => {
	try {
		const { id } = req.params;
		const car = await Car.findByPk(id);

		if (car) {
			return res.status(200).json({ message: "Get Car by ID Success", car });
		} else {
			return res.status(404).json({ message: "Car not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE CAR
exports.updateCar = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { name, price, brand_id } = req.body;

		const brand = await Brand.findByPk(brand_id);
		if (!brand) {
			return res.status(404).json({ error: "Brand not found" });
		}

		const car = await Car.findByPk(id);
		if (!car) {
			return res.status(404).json({ error: "Car not found" });
		}

		car.name = name;
		car.price = price;
		car.brand_id = brand_id;
		await car.save();

		return res.status(200).json({ message: "Update Car Success", car });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// DELETE CAR
exports.deleteCar = async (req, res) => {
	try {
		const { id } = req.params;

		const car = await Car.findByPk(id);

		if (car) {
			await car.destroy();

			return res.status(200).json({ message: "Car deleted successfully" });
		} else {
			return res.status(404).json({ message: "Car not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
