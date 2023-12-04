const asyncHandler = require('express-async-handler');
const BeerModel = require('../models/beerModel');
const BreweryModel = require('../models/breweryModel');
const SupplierModel = require('../models/supplierModel');
const KegSizeModel = require('../models/kegsizeModel');
const {sendMail, makePDF, htmlToText} = require('../utils');
const UserModel = require('../models/userModel');
const fs =require('fs');



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
      
      for (let item of orderedItems) {
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
          status: item.status
        };
        
        BeerModel.createBeer(beerData, (err, data) => {
          if (err) {console.log(err)};
        });
      }
      
    // send Email to staff
    let user = "Anonymous User";
    if (req.user && req.user !== undefined){
        user = req.user.full_name;
    }

      const breweries = []
      const suppliers = []
      const kegsizes = []

      function mapBreweries(err, data){
        if(err){
        }else{
          data.forEach(val => {
            breweries.push({
              id: val.brewery_id,
              name: val.name
            })
          })
        }
      }

      function mapSuppliers(err, data){
        if(err){
        }else{
          data.forEach(val => {
            suppliers.push({
              id: val.supplier_id,
              name: val.name
            })
          })
        }
      }

      function mapKegSizes(err, data){
        if(err){
        }else{
          data.forEach(val => {
            kegsizes.push({
              id: val.keg_size_id,
              name: val.name
            })
          })
        }
      }

      BreweryModel.getAllBreweries(mapBreweries)
      SupplierModel.getAllSuppliers(mapSuppliers)
      KegSizeModel.getAllSizes(mapKegSizes)
      
      const pdf = makePDF({
        user,
        breweries,
        suppliers,
        orderedItems,
        kegsizes,
      })

      let pdfFile, fname;
      
      await fs.readFile(pdf, {encoding: 'utf-8'}, (err, data) => {
        if(err){ console.log(err) };
        pdfFile = data
      })

      if (pdf.includes('/')){
        fname = pdf.split('/').pop() 
      }else{
        fname = pdf.split('\\').pop() 
      }

      sendMail({
        user,
        attachments: [
          {
            filename: fname,
            content: pdfFile
          },
        ]
      })


      return res.json({
        message: 'Record created successfully',
        // 'fileUrl': pdfFile,
        kegsizes,
        suppliers,
        breweries,
      });

    }catch(err){      
    //   return res.json({
    //     error: 'Server Error',
    //     stack: JSON.stringify(err)
    //   })
    
    throw err
    }
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

