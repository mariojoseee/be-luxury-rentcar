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
		}
	}
	Car.init(
		{
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			brand_id: {
				type: DataTypes.INTEGER,
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
