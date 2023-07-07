const express = require("express");
const { registerUser, login, verifyToken } = require("../controllers/auth-controller");
const { registerValidationRules, loginValidationRules } = require("../validators/auth-validator");
const { createTransaction } = require("../controllers/transaction-controller");
const { createTransactionValidationRules } = require("../validators/transaction-validator");
const profileController = require("../controllers/profile-controller");
const { getAllCars, getDetailsCar } = require("../controllers/car-controller");

const router = express.Router();

// AUTH
router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, login);
router.get("/get-profile", verifyToken, profileController.getProfile);

// GET DATA CARS
router.get("/cars", getAllCars);

// GET DATA CARS, SPEC, AND IMAGE
router.get("/cars-details/:id_car", getDetailsCar);

// GET DATA TRANSACTION BY USER LOGIN
router.get("/my-transaction/:id_user", getDetailsCar);

// CAR TRANSACTION
router.post("/transaction/:id_car", verifyToken, createTransactionValidationRules, createTransaction);

module.exports = router;
