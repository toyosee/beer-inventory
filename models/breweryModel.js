const db = require('../config/dbConnection');

const BreweriesModel = {
  getAllBreweries: (callback) => {
    const query = 'SELECT * FROM breweries';
    db.query(query, (err, data) => {
      callback(err, data);
    });
  },

  createBrewery: (breweryData, callback) => {
    const query = 'INSERT INTO Breweries (`name`, `location`) VALUES (?, ?)';
    const values = [breweryData.name, breweryData.location];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  getBreweryById: (breweryId, callback) => {
    const query = 'SELECT * FROM Breweries WHERE brewery_id = ?';
    db.query(query, [breweryId], (err, data) => {
      callback(err, data);
    });
  },

  updateBrewery: (breweryId, breweryData, callback) => {
    const query = 'UPDATE breweries SET `name` = ?, `location` = ? WHERE brewery_id = ?';
    const values = [breweryData.name, breweryData.location, breweryId];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  deleteBrewery: (breweryId, callback) => {
    const query = 'DELETE FROM breweries WHERE brewery_id = ?';
    db.query(query, [breweryId], (err, data) => {
      callback(err, data);
    });
  },
};

module.exports = BreweriesModel;
