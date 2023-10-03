const asyncHandler = require('express-async-handler');
const SuppliersModel = require('../models/supplierModel');

const SuppliersController = {
  getAllSuppliers: asyncHandler(async (req, res) => {
    SuppliersModel.getAllSuppliers((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(200).json(data);
    });
  }),

  createSupplier: asyncHandler(async (req, res) => {
    const supplierData = {
      name: req.body.name,
    };

    SuppliersModel.createSupplier(supplierData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(201).json({ message: 'Supplier created successfully' });
    });
  }),

  getSupplierById: asyncHandler(async (req, res) => {
    const supplierId = req.params.id;
    SuppliersModel.getSupplierById(supplierId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!data) return res.status(404).json({ error: 'Supplier not found' });
      return res.status(200).json(data);
    });
  }),

  updateSupplier: asyncHandler(async (req, res) => {
    const supplierId = req.params.id;
    const supplierData = {
      name: req.body.name,
    };

    SuppliersModel.updateSupplier(supplierId, supplierData, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'Supplier not found' });
      return res.status(200).json({ message: 'Supplier updated successfully' });
    });
  }),

  deleteSupplier: asyncHandler(async (req, res) => {
    const supplierId = req.params.id;

    SuppliersModel.deleteSupplier(supplierId, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      return res.status(200).json({ message: 'Supplier deleted successfully' });
    });
  }),
};

module.exports = SuppliersController;
