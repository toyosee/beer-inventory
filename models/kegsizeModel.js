const db = require('../config/dbConnection');

const KegSizesModel = {
  getAllSizes: (callback) => {
    const query = 'SELECT * FROM kegsizes';
    db.query(query, (err, data) => {
      callback(err, data);
    });
  },

  createSize: (sizeData, callback) => {
    const query = 'INSERT INTO kegsizes (`size`) VALUES (?)';
    const values = [sizeData.size];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  getSizeById: (sizeId, callback) => {
    const query = 'SELECT * FROM kegsizes WHERE keg_size_id = ?';
    db.query(query, [sizeId], (err, data) => {
      callback(err, data[0]);
    });
  },

  updateSize: (sizeId, sizeData, callback) => {
    const query = 'UPDATE kegsizes SET `size` = ? WHERE keg_size_id = ?';
    const values = [sizeData.size, sizeId];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  deleteSize: (sizeId, callback) => {
    const query = 'DELETE FROM kegsizes WHERE keg_size_id = ?';
    db.query(query, [sizeId], (err, data) => {
      callback(err, data);
    });
  },
};

module.exports = KegSizesModel;
