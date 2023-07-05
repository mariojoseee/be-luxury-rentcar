const { Transaction, Car, User } = require("../models");
const { validationResult } = require("express-validator");
const moment = require("moment");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");

// CREATE CAR TRANSACTION USER
exports.createTransaction = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { start_date, end_date } = req.body;
		const { id_car } = req.params;
		const id_user = req.User.userId;

		// Find a car
		const car = await Car.findOne({ where: { id: id_car } });
		if (!car) {
			return res.status(404).json({ error: "The car ID you selected is not available" });
		}

		// Find a user
		const user = await User.findOne({ where: { id: id_user } });
		if (!user) {
			return res.status(404).json({ error: "The user ID not available" });
		}

		// Upload identity_proof to Cloudinary
		const result = await cloudinary.uploader.upload(req.file.path, { folder: "identity_proofs" });
		// Get URL image from Cloudinary
		const identity_proofUrl = result.secure_url;

		// Car rental days calculation
		const startDate = moment(start_date, "YYYY-MM-DD");
		const endDate = moment(end_date, "YYYY-MM-DD");
		const duration = endDate.diff(startDate, "days");

		// Calculate total price
		const price = parseInt(car.price);
		const total_price = duration * price;

		await Transaction.create({
			start_date,
			end_date,
			car_id: id_car,
			user_id: id_user,
			total_price,
			identity_proof: identity_proofUrl,
		});

		const transaction = { start_date, end_date, car_name: car.name, customer: user.name, total_price, duration, identity_proofUrl };

		return res.status(201).json({ message: "Create Transaction Success", transaction });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
