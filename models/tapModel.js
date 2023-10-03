const db = require('../config/dbConnection'); // Import your database connection

const TapModel = {
  getTapList: (callback) => {
    // Implement the database query to fetch the tap list
    db.query('SELECT * FROM products WHERE status = "on-tap"', (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  getUntappedList: (callback) => {
    // Implement the database query to fetch the untapped list
    db.query('SELECT * FROM products WHERE status != "on-tap"', (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  updateBeerStatus: (beerId, newStatus, callback) => {
    // Implement the database query to update the status of a beer
    //console.log(beerId, newStatus)
    db.query('UPDATE products SET status = ? WHERE product_id = ?', [newStatus, beerId], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },
};

module.exports = TapModel;
