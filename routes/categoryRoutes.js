const express = require('express');
const { createCategory, deleteCategory, updateCategory, getAll } = require("../controllers/categoryController")

const router = express.Router();

// Create a Category
router.post('/', createCategory)

// Fetch all categories in tree format
router.get('/', getAll);

// Update Category (Name or Status)
router.put('/:id', updateCategory);

// Delete Category & Reassign Subcategories
router.delete('/:id', deleteCategory);

module.exports = router;
