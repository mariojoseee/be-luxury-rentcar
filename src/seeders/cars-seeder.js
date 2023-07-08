const { Car } = require("../models");
const db = require("../models/index");

const seedCars = async () => {
	await db.sequelize.sync();

	try {
		await Car.bulkCreate([
			{
				name: "All New Civic RS",
				price: 650000,
				status: 1,
				brand_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "New Odyssey 2.4L Prestige",
				price: 890000,
				status: 1,
				brand_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// sintaks -> node seeders/cars-seeder.js
		console.log("Seeder berhasil ditambahkan.");
	} catch (error) {
		console.error("Seeder gagal:", error);
	}

	await db.sequelize.close();
};

seedCars();
