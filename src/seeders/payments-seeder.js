const { Payment } = require("../models");
const db = require("../models/index");

const seedPayments = async () => {
	await db.sequelize.sync();

	try {
		await Payment.bulkCreate([
			{
				name: "Transfer Manual",
				admin_fee: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Midtrans",
				admin_fee: 5000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Doku",
				admin_fee: 6000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// sintaks -> node seeders/payments-seeder.js
		console.log("Seeder berhasil ditambahkan.");
	} catch (error) {
		console.error("Seeder gagal:", error);
	}

	await db.sequelize.close();
};

seedPayments();
