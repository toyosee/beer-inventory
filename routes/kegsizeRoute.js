// This file includes routes for kegsize type creation
const express = require('express')
const router = express.Router()
const {getAllSizes,createSize,getSizeById,updateSize,deleteSize} = require('../controllers/kegsizeController')

// Getting api routes for kegsize CRUD
router.route('/').get(getAllSizes).post(createSize)
router.route('/:id').get(getSizeById).put(updateSize).delete(deleteSize)


// Using module to export router
module.exports = router