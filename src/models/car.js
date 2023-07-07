"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Car extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Car.belongsTo(models.Brand, { foreignKey: "brand_id" });
			Car.hasMany(models.Image_Car, { foreignKey: "car_id" });
			Car.hasMany(models.Spesification, { foreignKey: "car_id" });
		}
	}
	Car.init(
		{
			name: DataTypes.STRING,
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1, // Default value: 1 (Ready)
			},
			brand_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Brand",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "Car",
			tableName: "cars",
		}
	);
	return Car;
};
