"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role: {
				type: DataTypes.ENUM("admin", "user"),
				allowNull: false,
				defaultValue: "user",
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);
	return User;
};
