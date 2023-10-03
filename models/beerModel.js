const db = require('../config/dbConnection');


// Model to select all products and order by product_id from most recent
const BeerModel = {
  getAllBeers: (callback) => {
    const query = 'SELECT * FROM products ORDER BY product_id DESC';
    db.query(query, (err, data) => {
      callback(err, data);
    });
  },

  // Model to create a new beer in the database
  createBeer: (beerData, callback) => {
    const query = 'INSERT INTO products (`name`, `type`, `brewery_id`, `keg_size_id`, `description`, `flavor_details`, `price_per_keg`, `supplier_id`, `arrival_date`, `serving_sizes`, `price_per_serving_size`, `category_id`, `tap_number`, `tap_id`, `status`) VALUES (?)';
    const values = [
      beerData.name,
      beerData.type,
      beerData.brewery_id,
      beerData.keg_size_id,
      beerData.description,
      beerData.flavor_details,
      beerData.price_per_keg,
      beerData.supplier_id,
      beerData.arrival_date,
      beerData.serving_sizes,
      beerData.price_per_serving_size,
      beerData.category_id,
      beerData.tap_number,
      beerData.tap_id,
      beerData.status
    ];

    db.query(query, [values], (err, data) => {
      callback(err, data);
    });
  },

  getBeerById: (beerId, callback) => {
    const query = 'SELECT * FROM products WHERE product_id = ?';
    db.query(query, [beerId], (err, data) => {
      callback(err, data[0]);
    });
  },

  updateBeer: (beerId, beerData, callback) => {
    const query = 'UPDATE products SET `tap_number`=? WHERE product_id=?';
    const values = [
      beerData.tap_number,
      //beerData.last_name,
    ];

    db.query(query, [...values, beerId], (err, data) => {
      callback(err, data);
    });
  },

  updateBeerStatus : (beerId, newStatus, callback) => {
    const query = 'UPDATE beers SET status = ? WHERE id = ?';
    db.query(query, [newStatus, beerId], callback);
  },
  

  deleteBeer: (beerId, callback) => {
    const query = 'DELETE FROM products WHERE product_id = ?';

    db.query(query, [beerId], (err, data) => {
      callback(err, data);
    });
  },
};

module.exports = BeerModel;
