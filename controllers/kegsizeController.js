const asyncHandler = require('express-async-handler');
const KegSizesModel = require('../models/kegsizeModel');

const KegSizesController = {
  getAllSizes: asyncHandler(async (req, res) => {
    KegSizesModel.getAllSizes((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(200).json(data);
    });
  }),

  createSize: asyncHandler(async (req, res) => {
    const sizeData = {
      size: req.body.size,
    };

    KegSizesModel.createSize(sizeData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(201).json({ message: 'Keg Size created successfully' });
    });
  }),

  getSizeById: asyncHandler(async (req, res) => {
    const sizeId = req.params.id;
    KegSizesModel.getSizeById(sizeId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!data) return res.status(404).json({ error: 'Keg Size not found' });
      return res.status(200).json(data);
    });
  }),

  updateSize: asyncHandler(async (req, res) => {
    const sizeId = req.params.id;
    const sizeData = {
      size: req.body.size,
    };

    KegSizesModel.updateSize(sizeId, sizeData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Keg Size not found' });
      return res.status(200).json({ message: 'Keg Size updated successfully' });
    });
  }),

  deleteSize: asyncHandler(async (req, res) => {
    const sizeId = req.params.id;

    KegSizesModel.deleteSize(sizeId, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: 'Keg Size not found' });
      }
      return res.status(200).json({ message: 'Keg Size deleted successfully' });
    });
  }),
};

module.exports = KegSizesController;
