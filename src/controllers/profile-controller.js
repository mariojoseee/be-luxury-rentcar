const { User } = require("../models");

exports.getProfile = async (req, res) => {
	try {
		const user = req.User;
		console.log(user);
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
