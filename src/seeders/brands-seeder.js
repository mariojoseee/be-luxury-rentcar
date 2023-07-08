const { Brand } = require("../models");
const db = require("../models/index");

const seedBrands = async () => {
	await db.sequelize.sync();

	try {
		await Brand.bulkCreate([
			{
				name: "Honda",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Toyota",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Daihatsu",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Wuling",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// sintaks -> node seeders/brands-seeder.js
		console.log("Seeder berhasil ditambahkan.");
	} catch (error) {
		console.error("Seeder gagal:", error);
	}

	await db.sequelize.close();
};

seedBrands();
