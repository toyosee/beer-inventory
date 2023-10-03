const express = require('express');
const router = express.Router();
//const beerController = require('../controllers/beerController');
const tapController = require('../controllers/tapController')

// Endpoint to fetch the tap and untapped lists
router.get('/', tapController.getTapList);
router.get('/untappedList', tapController.getUntappedList);

// Endpoint to update the status of a beer
router.patch('/updateStatus/:id', tapController.updateBeerStatus);

module.exports = router;
