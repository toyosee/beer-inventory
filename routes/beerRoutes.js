// This file includes routes for beer type creation
const express = require('express')
const router = express.Router()
const {getBeers, createBeer, getBeer, updateBeer, deleteBeer, updateBeerStatus} = require('../controllers/beerController')

// Getting api routes for beer CRUD
router.route('/').get(getBeers).post(createBeer)
router.route('/:id').get(getBeer).put(updateBeer).delete(deleteBeer)
//router.patch('/updateStatus/:id', updateBeerStatus);


// Using module to export router
module.exports = router