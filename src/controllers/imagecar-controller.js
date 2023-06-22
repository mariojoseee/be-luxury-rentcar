const { Car, Image_Car } = require("../models");
const path = require("path");
const fs = require("fs");
const { time } = require("console");

// READ ALL CAR IMAGES ON CAR ID
exports.getImagesCarById = async (req, res) => {
	try {
		// Menangkap Car Id untuk dilakukan query
		const { id } = req.params;
		const imagesCar = await Image_Car.findAll({ where: { car_id: id } });

		if (imagesCar) {
			return res.status(200).json({ message: "Get Images Car by ID Success", imagesCar });
		} else {
			return res.status(404).json({ message: "Images car not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// CREATE IMAGES CAR
exports.createImagesCar = async (req, res) => {
	if (req.files === null) return res.status(400).json({ message: "No File Uploaded" });
	const timestamp = Date.now();
	const file = req.files.file;
	const fileSize = file.data.length;
	const ext = path.extname(file.name);
	const fileName = file.md5 + timestamp + ext;
	const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
	const allowedType = [".png", ".jpg", ".jpeg"];

	if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid image format. Make sure the uploaded format is .jpg, .jpeg, and .png" });
	if (fileSize > 2000000) return res.status(422).json({ message: "Image must be less than 2 MB" });

	file.mv(`./public/images/${fileName}`, async (err) => {
		if (err) return res.status(500).json({ message: err.message });
		try {
			// Make sure car_id
			const { id } = req.params;
			const carId = await Car.findByPk(id);
			if (!carId) {
				return res.status(404).json({ error: "Car id not found" });
			}

			const input = await Image_Car.create({ image: fileName, url: url, car_id: id });
			res.status(201).json({ message: "Image Car Created Successfuly", input });
		} catch (error) {
			res.status(500).send({
				message: "An Error Occured",
				data: error.message,
			});
		}
	});
};

// DELETE IMAGE CAR BY ID
exports.deleteImagesCar = async (req, res) => {
	try {
		const { id } = req.params;

		const imageCar = await Image_Car.findByPk(id);

		if (imageCar) {
			const filepath = `./public/images/${imageCar.image}`;
			fs.unlinkSync(filepath);
			await imageCar.destroy();

			return res.status(200).json({ message: "Image car deleted successfully" });
		} else {
			return res.status(404).json({ message: "Image car not found" });
		}
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE IMAGE CAR
exports.updateImagesCar = async (req, res) => {
	try {
		const { id } = req.params;

		const imageCar = await Image_Car.findByPk(id);
		if (!imageCar) {
			return res.status(404).json({ error: "Image car not found" });
		}

		const timestamp = Date.now();
		let fileName = "";
		if (req.files === null) {
			fileName = imageCar.image;
		} else {
			const file = req.files.file;
			const fileSize = file.data.length;
			const ext = path.extname(file.name);
			fileName = file.md5 + timestamp + ext;
			const allowedType = [".png", ".jpg", ".jpeg"];

			if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid image format. Make sure the uploaded format is .jpg, .jpeg, and .png" });
			if (fileSize > 2000000) return res.status(422).json({ message: "Image must be less than 2 MB" });

			const filepath = `./public/images/${imageCar.image}`;
			fs.unlinkSync(filepath);

			file.mv(`./public/images/${fileName}`, (err) => {
				if (err) return res.status(500).json({ message: err.message });
			});
		}

		const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

		await Image_Car.update(
			{ image: fileName, url: url },
			{
				where: { id: id },
			}
		);

		return res.status(200).json({ message: "Image Car Updated Successfuly", data: { image: fileName, url: url } });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};