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
			// define association here
		}
	}
	Image_Car.init(
		{
			image: DataTypes.STRING,
			url: DataTypes.STRING,
			car_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Image_Car",
			tableName: "image_cars",
		}
	);
	return Image_Car;
};
