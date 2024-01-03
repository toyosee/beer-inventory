const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      const token = authHeader.split(' ')[1];
      const secretKey = process.env.JWT_SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);

      UserModel.getUserByToken(token, (err, users) => {
        req.user = users[0] || {full_name: 'Anonymous User', id: 0.13, email: "NA", role: "NA", password: "NA"};
      });
      
      next();
      // console.timeLog()
    } else {
      throw new Error('User Authentication failed again and again');
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

module.exports = authenticate;
