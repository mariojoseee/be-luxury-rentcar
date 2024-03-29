"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Image_Car extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Image_Car.belongsTo(models.Car, { foreignKey: "car_id" });
		}
	}
	Image_Car.init(
		{
			image: {
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
		},
		{
			sequelize,
			modelName: "Image_Car",
			tableName: "image_cars",
		}
	);
	return Image_Car;
};
