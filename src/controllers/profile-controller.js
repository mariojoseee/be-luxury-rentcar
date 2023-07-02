const { User } = require("../models");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

// Get Profile By Id
exports.getProfile = async (req, res) => {
	try {
		const user = req.User;
		const getData = await User.findOne({
			where: { id: user.userId },
		});

		if (!getData) {
			return res.status(404).send({
				message: "User not found",
			});
		}

		// Respon get me success
		return res.status(201).json({ message: "Get My Profile Success", data: getData });
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// Update Profile
exports.updateProfileUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { username, name, phone_number } = req.body;

	try {
		// Retrieving the userId based on the ID from the database
		const user = await User.findByPk(req.User.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Validasi image profile
		const timestamp = Date.now();
		const file = req.files ? req.files.file : null;
		const fileSize = file ? file.data.length : 0;
		const ext = file ? path.extname(file.name) : "";
		let fileName = "";
		let url = "";

		// Pengecekan jika terdapat data image di DB
		if (user.image !== null) {
			// Jika user tidak ingin update data image atau tidak mengupload image
			if (file === null) {
				fileName = user.image;
				url = user.url;
			} else {
				// Update profile image
				const filepath = `./public/images/profiles/${user.image}`;
				fs.unlinkSync(filepath);
				fileName = file.md5 + timestamp + ext;
				url = `${req.protocol}://${req.get("host")}/images/profiles/${fileName}`;
			}
			// Pengecekan jika tidak terdapat data image di DB (pertama kali isi foto)
		} else {
			// Jika user tidak mengupload image
			if (file === null) {
				return res.status(400).json({ message: "No File Uploaded" });
			} else {
				fileName = file.md5 + timestamp + ext;
				url = `${req.protocol}://${req.get("host")}/images/profiles/${fileName}`;
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

		// Pengecekan apakah user mengupload image
		if (file) {
			file.mv(`./public/images/profiles/${fileName}`, async (err) => {
				if (err) return res.status(500).json({ message: err.message });

				// Update user profile
				await User.update(
					{ name, username, phone_number, image: fileName, url },
					{
						where: { id: user.id },
					}
				);

				// Mengambil data user yang sudah diperbarui dari database
				const updatedUser = await User.findByPk(user.id);
				// Return data user yang sudah diperbaharui
				res.status(201).json({ message: "Update profile successfully", updatedUser });
			});
		} else {
			// Update user profile tanpa mengganti image
			await User.update(
				{ name, username, phone_number },
				{
					where: { id: user.id },
				}
			);

			// Mengambil data user yang sudah diperbarui dari database
			const updatedUser = await User.findByPk(user.id);
			// Return data user yang sudah diperbaharui
			res.status(201).json({ message: "Update profile successfully", updatedUser });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
