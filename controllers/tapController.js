const asyncHandler = require('express-async-handler');
const TapModel = require('../models/tapModel');

const TapController = {
  getTapList: asyncHandler(async (req, res) => {
    TapModel.getTapList((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json({ tapList: data });
    });
  }),

  getUntappedList: asyncHandler(async (req, res) => {
    TapModel.getUntappedList((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.json({ untappedList: data });
    });
  }),

  updateBeerStatus: asyncHandler(async (req, res) => {
    const beerId = req.params.id;
    const newStatus = req.body.status; // Assuming the request body contains the new status

    // console.log('Received beerId:', beerId);
    // console.log('Received newStatus:', newStatus);

    TapModel.updateBeerStatus(beerId, newStatus, (err, data) => {
        //console.log('Received request body:', req.body)
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      //console.log(data)
      return res.json({ message: 'Status updated successfully' });
    });
  }),
};

module.exports = TapController;
