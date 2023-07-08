const { User } = require("../models");
const db = require("../models/index");

const seedUsers = async () => {
	await db.sequelize.sync();

	try {
		await User.bulkCreate([
			{
				name: "Super Admin",
				username: "superadmin",
				email: "superadmin@luxuryrentcar.com",
				password: "$2a$10$GpgtUToV4T1P5PkNWTbZZ.H4KOE0pwi97cf/4DqVJ6V0mPnCgH2M6",
				phone_number: "082176253488",
				role: "admin",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Muharrir",
				username: "muharrir",
				email: "muharrir@gmail.com",
				password: "$2a$10$7BnpNXAAnwhQ6I52l7FCqOMQ1HJC9UXJJFYDaIbTM6rYYLq6MH4Ym",
				phone_number: "082716154300",
				role: "user",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// sintaks -> node seeders/users-seeder.js
		console.log("Seeder berhasil ditambahkan.");
	} catch (error) {
		console.error("Seeder gagal:", error);
	}

	await db.sequelize.close();
};

seedUsers();
