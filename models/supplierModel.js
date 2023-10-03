const db = require('../config/dbConnection');

const SuppliersModel = {
  getAllSuppliers: (callback) => {
    const query = 'SELECT * FROM suppliers';
    db.query(query, (err, data) => {
      callback(err, data);
    });
  },

  createSupplier: (supplierData, callback) => {
    const query = 'INSERT INTO suppliers (`name`) VALUES (?)';
    const values = [supplierData.name];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  getSupplierById: (supplierId, callback) => {
    const query = 'SELECT * FROM suppliers WHERE supplier_id = ?';
    db.query(query, [supplierId], (err, data) => {
      callback(err, data[0]);
    });
  },

  updateSupplier: (supplierId, supplierData, callback) => {
    const query = 'UPDATE suppliers SET `name` = ? WHERE supplier_id = ?';
    const values = [supplierData.name, supplierId];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  deleteSupplier: (supplierId, callback) => {
    const query = 'DELETE FROM suppliers WHERE supplier_id = ?';
    db.query(query, [supplierId], (err, data) => {
      callback(err, data);
    });
  },
};

module.exports = SuppliersModel;
