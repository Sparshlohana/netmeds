const express = require("express");
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories.controller");

// Get all categories
router.get("/", getAllCategories);

// Get a single category by ID
router.get("/:id", getCategoryById);

// Create a new category
router.post("/", createCategory);

// Update an existing category by ID
router.put("/:id", updateCategory);

// Delete a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
