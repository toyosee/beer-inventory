const asyncHandler = require('express-async-handler');
const BeerModel = require('../models/beerModel');
const {sendMail, logError, makePDF, htmlToText} = require('../utils');

const BeerController = {
  getBeers: asyncHandler(async (req, res) => {
    BeerModel.getAllBeers((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json(data);
    });
  }),

  // Controller for ordered beers
  getOrderedBeerById: asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    BeerModel.getAllOrderedBeerById(beerId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json(data);
    });
  }),

  createBeer: asyncHandler(async (req, res) => {
    const {orderedItems} = req.body;
    try{
      for (const item of orderedItems) {
        const beerData = {
          name: item.name,
          type: item.type,
          brewery_id: item.brewery_id,
          keg_size_id: item.keg_size_id,
          description: item.description,
          flavor_details: item.flavor_details,
          price_per_keg: item.price_per_keg,
          supplier_id: item.supplier_id,
          arrival_date: item.arrival_date,
          serving_sizes: item.serving_sizes,
          price_per_serving_size: item.price_per_serving_size,
          category_id: item.category_id,
          tap_number: item.tap_number,
          tap_id: item.tap_id,
          status: item.status
        };
        
        BeerModel.createBeer(beerData, (err, data) => {
          if (err) throw err;
        });
      }
    }catch(err){
      logError(err)
      return res.json({
        error: 'Server Error',
        stack: JSON.stringify(err)
      })
    }

    // send Email to staff
    // const pdfFile = makePDF(orderedItems)
    const pdfFile = ''

    return res.json({ message: 'Record created successfully', 'fileUrl': pdfFile });
  }),

  getBeer: asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    BeerModel.getBeerById(beerId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!data) return res.status(404).json({ error: 'Beer not found' });
      return res.status(200).json(data);
    });
  }),

  updateBeerStatus: asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    const newStatus = req.body.status; // Assuming you send the new status in the request body

    BeerModel.updateBeerStatus(beerId, newStatus, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json({ message: 'Status updated successfully' });
    });
  }),

  updateBeer: asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    const beerData = {
      name: req.body.name,
      type: req.body.type,
      brewery_id: req.body.brewery_id,
      keg_size_id: req.body.keg_size_id,
      description: req.body.description,
      flavor_details: req.body.flavor_details,
      price_per_keg: req.body.price_per_keg,
      supplier_id: req.body.supplier_id,
      arrival_date: req.body.arrival_date,
      serving_sizes: req.body.serving_sizes,
      price_per_serving_size: req.body.price_per_serving_size,
      category_id: req.body.category_id,
      tap_number: req.body.tap_number,
      tap_id: req.body.tap_id,
      status: req.body.status
    };

    BeerModel.updateBeer(beerId, beerData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json({ message: 'Record updated successfully' });
    });
  }),

  deleteBeer: asyncHandler(async (req, res) => {
    const beerId = req.params.id;

    BeerModel.deleteBeer(beerId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json({ message: 'Record deleted successfully' });
    });
  }),
};

module.exports = BeerController;
