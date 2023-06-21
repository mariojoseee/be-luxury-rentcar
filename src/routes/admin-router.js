const express = require("express");
const { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } = require("../controllers/brand-controller");
const { createBrandValidationRules, updateBrandValidationRules, getBrandIdRules } = require("../validators/brand-validator");
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require("../controllers/car-controller");
const { createCarValidationRules, updateCarValidationRules, getCarIdRules } = require("../validators/car-validator");
const { verifyToken, verifyAdmin } = require("../controllers/auth-controller");

const router = express.Router();

// CRUD Brand
router.get("/brands", verifyToken, verifyAdmin, getAllBrands);
router.post("/brands", verifyToken, verifyAdmin, createBrandValidationRules, createBrand);
router.get("/brands/:id", verifyToken, verifyAdmin, getBrandIdRules, getBrandById);
router.put("/brands/:id", verifyToken, verifyAdmin, updateBrandValidationRules, updateBrand);
router.delete("/brands/:id", verifyToken, verifyAdmin, getBrandIdRules, deleteBrand);

// CRUD Cars
router.get("/cars", verifyToken, verifyAdmin, getAllCars);
router.post("/cars", verifyToken, verifyAdmin, createCarValidationRules, createCar);
router.get("/cars/:id", verifyToken, verifyAdmin, getCarIdRules, getCarById);
router.put("/cars/:id", verifyToken, verifyAdmin, updateCarValidationRules, updateCar);
router.delete("/cars/:id", verifyToken, verifyAdmin, getCarIdRules, deleteCar);

module.exports = router;
