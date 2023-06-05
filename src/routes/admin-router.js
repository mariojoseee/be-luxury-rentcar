const express = require("express");
const brandController = require("../controllers/brand-controller");

const router = express.Router();

router.use("/", brandController.brand);

module.exports = router;
