const { Transaction, Car, User, Payment, sequelize } = require("../models");
const { validationResult } = require("express-validator");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

// CREATE CAR TRANSACTION USER
exports.createTransaction = async (req, res) => {
	try {
		if (req.files === null) return res.status(400).json({ message: "No File Uploaded" });
		const timestamp = Date.now();
		const file = req.files.file;
		const fileSize = file.data.length;
		const ext = path.extname(file.name);
		const fileName = file.md5 + timestamp + ext;
		const url = `${req.protocol}://${req.get("host")}/images/transactions/${fileName}`;
		const allowedType = [".png", ".jpg", ".jpeg"];

		if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid image format. Make sure the uploaded format is .jpg, .jpeg, and .png" });
		if (fileSize > 2000000) return res.status(422).json({ message: "Image must be less than 2 MB" });

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
		if (car.status == 2) {
			return res.status(404).json({ error: "This car is still in the payment stage for one of the customers" });
		}

		// Find a user
		const user = await User.findOne({ where: { id: id_user } });
		if (!user) {
			return res.status(404).json({ error: "The user ID not available" });
		}

		// Car rental days calculation
		const startDate = moment(start_date, "YYYY-MM-DD");
		const endDate = moment(end_date, "YYYY-MM-DD");
		const duration = endDate.diff(startDate, "days");

		// Calculate total price
		const price = parseInt(car.price);
		const total_price = duration * price;

		const input = await Transaction.create({
			start_date,
			end_date,
			car_id: id_car,
			user_id: id_user,
			total_price,
			identity_image: fileName,
			url_identity: url,
		});

		if (input) {
			// Images are uploaded to the server
			file.mv(`./public/images/transactions/${fileName}`, async (err) => {
				if (err) return res.status(500).json({ message: err.message });
			});

			car.status = 2; // 2 = Waiting for payment
			await car.save();
		}
		const transaction = { start_date, end_date, car_name: car.name, customer: user.name, total_price, status_payment: "Waiting for payment", duration, identity_image: fileName, url_identity: url };

		return res.status(201).json({ message: "Create Transaction Success", transaction });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// GET HISTORY TRANSACTION USER
exports.historyTransaction = async (req, res) => {
	try {
		const user = req.User;

		const getHistory = await Transaction.findAll({
			where: { user_id: user.userId },
			attributes: [
				"id",
				[sequelize.literal("`User`.`name`"), "customer_name"],
				[sequelize.literal("`Car`.`name`"), "car_name"],
				[sequelize.fn("date_format", sequelize.col("start_date"), "%Y-%m-%d"), "start_date"],
				[sequelize.fn("date_format", sequelize.col("end_date"), "%Y-%m-%d"), "end_date"],
				[sequelize.literal("DATEDIFF(end_date, start_date) + 1"), "duration_in_days"],
				[sequelize.literal("CONCAT('Rp. ', FORMAT(total_price, 0))"), "total_price"],
				[sequelize.literal("`Payment`.`name`"), "payment_name"],
				"url_identity",
			],
			raw: true,
			include: [
				{
					model: Payment,
					attributes: [],
				},
				{
					model: User,
					attributes: [],
				},
				{
					model: Car,
					attributes: [],
				},
			],
		});

		if (!getHistory) {
			return res.status(404).send({
				message: "You have never made a transaction",
			});
		}

		// Respon get me success
		return res.status(201).json({ message: "Get History Transaction Success", data: getHistory });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE BUKTI PEMBAYARAN TRANSAKSI CUSTOMER
exports.updatePaymentProof = async (req, res) => {
	try {
		const { id } = req.params;

		// Retrieving the transaction id from the database
		const transaction = await Transaction.findByPk(id);
		if (!transaction) {
			return res.status(404).json({ error: "Transaction not found" });
		}

		// Validasi payment_image profile
		const timestamp = Date.now();
		const file = req.files ? req.files.file : null;
		const fileSize = file ? file.data.length : 0;
		const ext = file ? path.extname(file.name) : "";
		let fileName = "";
		let url = "";

		// Pengecekan jika terdapat data payment_image di DB
		if (transaction.payment_image !== null) {
			// Update profile image
			const filepath = `./public/images/payments/${transaction.payment_image}`;
			fs.unlinkSync(filepath);
			fileName = file.md5 + timestamp + ext;
			url = `${req.protocol}://${req.get("host")}/images/payments/${fileName}`;
			// Pengecekan jika tidak terdapat data image di DB (pertama kali isi foto)
		} else {
			// Jika user tidak mengupload image
			if (file === null) {
				return res.status(400).json({ message: "No File Uploaded" });
			} else {
				fileName = file.md5 + timestamp + ext;
				url = `${req.protocol}://${req.get("host")}/images/payments/${fileName}`;
			}
		}

		// Validasi format tipe image
		const allowedType = [".png", ".jpg", ".jpeg"];
		if (file && !allowedType.includes(ext.toLowerCase())) {
			return res.status(422).json({
				message: "Invalid image format. Make sure the uploaded format is .jpg, .jpeg, and .png",
			});
		}

		// Validasi size image
		if (fileSize > 2000000) {
			return res.status(422).json({ message: "Image must be less than 2 MB" });
		}

		// User mengupload payment of proof
		if (file) {
			file.mv(`./public/images/payments/${fileName}`, async (err) => {
				if (err) return res.status(500).json({ message: err.message });

				await Transaction.update({ payment_image: fileName, url_payment: url }, { where: { id } });

				const updatedImage = await Transaction.findByPk(id);
				res.status(201).json({ message: "Upload payment of proof successfully", data: { id: id, payment_image: fileName, url_payment: url } });
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
