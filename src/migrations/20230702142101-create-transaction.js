"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("transactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			total_price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			identity_proof: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			car_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "cars",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			payment_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("transactions");
	},
};
