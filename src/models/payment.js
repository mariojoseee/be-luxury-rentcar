"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Payment.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			admin_fee: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "Payment",
			tableName: "payments",
		}
	);
	return Payment;
};
