// This file includes routes for beer type creation
const express = require('express')
const router = express.Router()
const {getAllBreweries,createBrewery,getBreweryById,updateBrewery,deleteBrewery} = require('../controllers/brewriesController')

// Getting api routes for brewry CRUD
router.route('/').get(getAllBreweries).post(createBrewery)
router.route('/:id').get(getBreweryById).put(updateBrewery).delete(deleteBrewery)


// Using module to export router
module.exports = router