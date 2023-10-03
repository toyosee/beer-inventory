// This file includes routes for category type creation
const express = require('express')
const router = express.Router()
const {getAllCategories,createCategory,getCategoryById,updateCategory,deleteCategory} = require('../controllers/categoryController')

// Getting api routes for category CRUD
router.route('/').get(getAllCategories).post(createCategory)
router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory)


// Using module to export router
module.exports = router