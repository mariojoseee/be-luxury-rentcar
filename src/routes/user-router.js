const express = require("express");
const { registerUser, login, verifyToken } = require("../controllers/auth-controller");
const { registerValidationRules, loginValidationRules, updateUserValidationRules } = require("../validators/auth-validator");
const { createTransaction, historyTransaction } = require("../controllers/transaction-controller");
const { createTransactionValidationRules } = require("../validators/transaction-validator");
const profileController = require("../controllers/profile-controller");
const { getAllCars, getDetailsCar } = require("../controllers/car-controller");
const { updateProfileUser } = require("../controllers/profile-controller");
const { updatePaymentProof } = require("../controllers/transaction-controller");

const router = express.Router();

// AUTH
router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, login);
router.get("/get-profile", verifyToken, profileController.getProfile);

// EDIT PROFILE
router.put("/profile", verifyToken, updateUserValidationRules, updateProfileUser);

// GET DATA CARS
router.get("/cars", getAllCars);

// GET DATA CARS, SPEC, AND IMAGE
router.get("/cars-details/:id_car", getDetailsCar);

// GET DATA TRANSACTION BY USER LOGIN
router.get("/my-transaction", verifyToken, historyTransaction);

// CAR TRANSACTION
router.post("/transaction/:id_car", verifyToken, createTransactionValidationRules, createTransaction);

// UPLOAD BUKTI PEMBAYARAN
router.put("/upload-payment-proof/:id", verifyToken, updatePaymentProof);

module.exports = router;
