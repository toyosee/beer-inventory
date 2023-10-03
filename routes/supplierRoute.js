// This file includes routes for supplier type creation
const express = require('express')
const router = express.Router()
const {getAllSuppliers,createSupplier,getSupplierById,updateSupplier,deleteSupplier} = require('../controllers/suppliersController')

// Getting api routes for supplier CRUD
router.route('/').get(getAllSuppliers).post(createSupplier)
router.route('/:id').get(getSupplierById).put(updateSupplier).delete(deleteSupplier)


// Using module to export router
module.exports = router