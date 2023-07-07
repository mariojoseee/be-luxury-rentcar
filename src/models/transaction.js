"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Transaction.belongsTo(models.Car, { foreignKey: "car_id" });
		}
	}
	Transaction.init(
		{
			start_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			total_price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			identity_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			car_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Car",
					key: "id",
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "User",
					key: "id",
				},
			},
			payment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
		},
		{
			sequelize,
			modelName: "Transaction",
			tableName: "transactions",
		}
	);
	return Transaction;
};
