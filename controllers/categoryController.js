const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    let category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ message: "Category already exists" });

    let status = "active";
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory)
        return res.status(404).json({ message: "Parent category not found" });
      if (parentCategory.status === "inactive") status = "inactive"; // Inherit inactive status
    }

    category = new Category({ name, parent: parent || null, status });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    const buildTree = (parentId = null) =>
      categories
        .filter((cat) => String(cat.parent) === String(parentId))
        .map((cat) => ({ ...cat, children: buildTree(cat._id) }));

    res.json(buildTree());
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    if (status) {
      category.status = status;

      if (status === "inactive") {
        await Category.updateMany(
          { parent: category._id },
          { status: "inactive" }
        );
      }
    }

    await category.save();
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await Category.updateMany(
      { parent: category._id },
      { parent: category.parent }
    );

    await category.deleteOne();

    res.json({ message: "Category deleted and subcategories reassigned" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCategory, getAll, updateCategory, deleteCategory };
