const Category = require("../models/category.model");

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).send(categories);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).send(category);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({
            name,
        });

        const savedCategory = await newCategory.save();
        return res.status(201).send(savedCategory);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name,
            },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).send(updatedCategory);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
