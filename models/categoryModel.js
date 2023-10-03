const db = require('../config/dbConnection');

const CategoriesModel = {
  getAllCategories: (callback) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, data) => {
      callback(err, data);
    });
  },

  createCategory: (categoryData, callback) => {
    const query = 'INSERT INTO categories (`name`, `type`) VALUES (?, ?)';
    const values = [categoryData.name, categoryData.type];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  getCategoryById: (categoryId, callback) => {
    const query = 'SELECT * FROM categories WHERE category_id = ?';
    db.query(query, [categoryId], (err, data) => {
      callback(err, data[0]);
    });
  },

  updateCategory: (categoryId, categoryData, callback) => {
    const query = 'UPDATE categories SET `name` = ?, `type` = ? WHERE category_id = ?';
    const values = [categoryData.name, categoryData.type, categoryId];

    db.query(query, values, (err, data) => {
      callback(err, data);
    });
  },

  deleteCategory: (categoryId, callback) => {
    const query = 'DELETE FROM categories WHERE category_id = ?';
    db.query(query, [categoryId], (err, data) => {
      callback(err, data);
    });
  },
};

module.exports = CategoriesModel;
