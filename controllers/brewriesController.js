const asyncHandler = require('express-async-handler');
const BreweriesModel = require('../models/breweryModel');

const BreweriesController = {
  getAllBreweries: asyncHandler(async (req, res) => {
    BreweriesModel.getAllBreweries((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(200).json(data);
    });
  }),

  createBrewery: asyncHandler(async (req, res) => {
    const breweryData = {
      name: req.body.name,
      location: req.body.location,
    };

    BreweriesModel.createBrewery(breweryData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(201).json({ message: 'Brewery created successfully' });
    });
  }),

  getBreweryById: asyncHandler(async (req, res) => {
    const breweryId = req.params.id;
    BreweriesModel.getBreweryById(breweryId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!data) return res.status(404).json({ error: 'Brewery not found' });
      return res.status(200).json(data);
    });
  }),

  updateBrewery: asyncHandler(async (req, res) => {
    const breweryId = req.params.id;
    const breweryData = {
      name: req.body.name,
      location: req.body.location,
    };

    BreweriesModel.updateBrewery(breweryId, breweryData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Brewery not found' });
      return res.status(200).json({ message: 'Brewery updated successfully' });
    });
  }),

  deleteBrewery: asyncHandler(async (req, res) => {
    const breweryId = req.params.id;

    BreweriesModel.deleteBrewery(breweryId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Brewery not found' });
      return res.status(200).json({ message: 'Brewery deleted successfully' });
    });
  }),
};

module.exports = BreweriesController;
