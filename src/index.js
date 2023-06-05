require("dotenv").config();
const express = require("express");
const cors = require("cors");

const adminRouter = require("./routes/admin-router");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/admin", adminRouter);

app.listen(process.env.SERVER_PORT, () => {
	console.log("Server Running");
});
