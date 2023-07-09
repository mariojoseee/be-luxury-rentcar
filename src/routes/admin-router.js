const express = require("express");
const { verifyToken, verifyAdmin } = require("../controllers/auth-controller");
const { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } = require("../controllers/brand-controller");
const { createBrandValidationRules, updateBrandValidationRules } = require("../validators/brand-validator");
const { createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } = require("../controllers/payment-controller");
const { createPaymentValidationRules, updatePaymentValidationRules } = require("../validators/payment-validator");
const { createCar, getAllCars, getCarById, updateCar, deleteCar, updateStatusCar } = require("../controllers/car-controller");
const { createCarValidationRules, updateCarValidationRules } = require("../validators/car-validator");
const { getImagesCarById, createImagesCar, deleteImagesCar, updateImagesCar } = require("../controllers/imagecar-controller");
const { getSpesificationCarById, createSpesification, deleteSpesification, updateSpesification } = require("../controllers/spesification-controller");
const { updatePaymentProof } = require("../controllers/transaction-controller");
const { spesificationValidationRules } = require("../validators/spesification-validator");

const router = express.Router();

// CRUD Brand
router.get("/brands", verifyToken, verifyAdmin, getAllBrands);
router.post("/brands", verifyToken, verifyAdmin, createBrandValidationRules, createBrand);
router.get("/brands/:id", verifyToken, verifyAdmin, getBrandById);
router.put("/brands/:id", verifyToken, verifyAdmin, updateBrandValidationRules, updateBrand);
router.delete("/brands/:id", verifyToken, verifyAdmin, deleteBrand);

// CRUD Payment
router.get("/payments", verifyToken, verifyAdmin, getAllPayments);
router.post("/payments", verifyToken, verifyAdmin, createPaymentValidationRules, createPayment);
router.get("/payments/:id", verifyToken, verifyAdmin, getPaymentById);
router.put("/payments/:id", verifyToken, verifyAdmin, updatePaymentValidationRules, updatePayment);
router.delete("/payments/:id", verifyToken, verifyAdmin, deletePayment);

// CRUD Cars
router.get("/cars", verifyToken, verifyAdmin, getAllCars);
router.post("/cars", verifyToken, verifyAdmin, createCarValidationRules, createCar);
router.get("/cars/:id", verifyToken, verifyAdmin, getCarById);
router.put("/cars/:id", verifyToken, verifyAdmin, updateCarValidationRules, updateCar);
router.delete("/cars/:id", verifyToken, verifyAdmin, deleteCar);

// CRUD Image Car
router.get("/image-car/:id_car", verifyToken, verifyAdmin, getImagesCarById);
router.post("/image-car/:id_car", verifyToken, verifyAdmin, createImagesCar);
router.delete("/image-car/:id", verifyToken, verifyAdmin, deleteImagesCar);
router.patch("/image-car/:id", verifyToken, verifyAdmin, updateImagesCar);

// CRUD Spesification Car
router.get("/spesification/:id_car", verifyToken, verifyAdmin, getSpesificationCarById);
router.post("/spesification/:id_car", verifyToken, verifyAdmin, spesificationValidationRules, createSpesification);
router.delete("/spesification/:id", verifyToken, verifyAdmin, deleteSpesification);
router.patch("/spesification/:id", verifyToken, verifyAdmin, spesificationValidationRules, updateSpesification);

// Update Status Mobil (Bukti Pembayaran valid)
router.put("/update-status-car/:id", verifyToken, verifyAdmin, updateStatusCar);

module.exports = router;
