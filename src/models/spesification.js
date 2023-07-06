"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Spesification extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Spesification.belongsTo(models.Car, { foreignKey: "car_id" });
		}
	}
	Spesification.init(
		{
			text: {
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
		},
		{
			sequelize,
			modelName: "Spesification",
			tableName: "spesifications",
		}
	);
	return Spesification;
};
