const asyncHandler = require('express-async-handler');
const CategoriesModel = require('../models/categoryModel');

const CategoriesController = {
  getAllCategories: asyncHandler(async (req, res) => {
    CategoriesModel.getAllCategories((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(200).json(data);
    });
  }),

  createCategory: asyncHandler(async (req, res) => {
    const categoryData = {
      name: req.body.name,
      type: req.body.type,
    };

    CategoriesModel.createCategory(categoryData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(201).json({ message: 'Category created successfully' });
    });
  }),

  getCategoryById: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    CategoriesModel.getCategoryById(categoryId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!data) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json(data);
    });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const categoryData = {
      name: req.body.name,
      type: req.body.type,
    };

    CategoriesModel.updateCategory(categoryId, categoryData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json({ message: 'Category updated successfully' });
    });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    CategoriesModel.deleteCategory(categoryId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json({ message: 'Category deleted successfully' });
    });
  }),
};

module.exports = CategoriesController;
