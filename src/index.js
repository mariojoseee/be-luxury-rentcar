require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const adminRouter = require("./routes/admin-router");
const userRouter = require("./routes/user-router");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize
	.authenticate()
	.then(function (error) {
		console.log(`Database connection has been established successfully.`);
	})
	.catch(function (error) {
		console.log("Unable connect to database: ", error);
	});

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(process.env.SERVER_PORT, () => {
	console.log("Server running on port " + process.env.SERVER_PORT);
});
