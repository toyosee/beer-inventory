const asyncHandler = require('express-async-handler')
const express = require('express')
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root', // Your MySQL username
  password: 'BeerPassword', // Your MySQL password
  database: 'beer', // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
