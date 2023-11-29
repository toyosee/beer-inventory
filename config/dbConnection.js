const asyncHandler = require('express-async-handler')
const express = require('express')
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.BEER_DB_HOST || 'localhost', // 172.17.0.2
  user: process.env.BEER_DB_USER || 'unitvjdm_root', // Your MySQL username
  password: process.env.BEER_DB_PASSWORD || 'BeerPassword', // Your MySQL password
  database: process.env.BEER_DB_NAME || 'unitvjdm_beer', // Your database name
  port: '3306'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
