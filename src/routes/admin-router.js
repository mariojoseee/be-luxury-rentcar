const express = require("express");
const { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } = require("../controllers/brand-controller");
const { createBrandValidationRules, updateBrandValidationRules } = require("../validators/brand-validator");
const { verifyToken } = require("../controllers/auth-controller");

const router = express.Router();

// CRUD Brand
router.get("/brands", verifyToken, getAllBrands);
router.post("/brands", verifyToken, createBrandValidationRules, createBrand);
router.get("/brands/:id", verifyToken, getBrandById);
router.put("/brands/:id", verifyToken, updateBrandValidationRules, updateBrand);
router.delete("/brands/:id", verifyToken, deleteBrand);

module.exports = router;
