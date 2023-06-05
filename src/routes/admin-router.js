const express = require("express");
const Controller = require("../controllers/nama-controller");

const router = express.Router();

router.use("/", Controller.namaFungsi);

module.exports = router;
