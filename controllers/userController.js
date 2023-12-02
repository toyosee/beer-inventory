const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');

const UserController = {
  getUsers: asyncHandler(async (req, res) => {
    UserModel.getUsers((err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(200).json(data);
    });
  }),
  
  registerUser: asyncHandler(async (req, res) => {
    const { username, password, full_name, email, role } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = {
      username,
      password: hashedPassword,
      full_name,
      email,
      role,
    };

    UserModel.createUser(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  }),

  getUserById: asyncHandler(async (req, res) => {
    const userId = req.params.id;
    
    UserModel.getUserById(userId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.length === 0) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(data[0]);
    });
  }),

  updateUser: asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { username, password, full_name, email, role } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      username,
      password: hashedPassword,
      full_name,
      email,
      role,
    };
    
    UserModel.updateUser(userId, user, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json({ message: 'User updated successfully' });
    });
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const userId = req.params.id;
    
    UserModel.deleteUser(userId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (data.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json({ message: 'User deleted successfully' });
    });
  }),

  loginUser: asyncHandler(async (req, res) => {
    try{
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(400);
          throw new Error("All fields are mandatory");
        }
    
        UserModel.getUserByUsername(username, async (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    
          if (results.length === 0) {
            return res.status(401).json({ message: 'Username or Password Incorrect' });
          }
    
          let user = results[0];
    
          // Compare the provided password with the stored hashed password
          const isPasswordValid = user && (await bcrypt.compare(password, user.password));
    
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Username or Password Incorrect' });
          }
    
          // Generate a JSON Web Token (JWT) only if the credentials are correct
          const secretKey = process.env.JWT_SECRET_KEY;
          const data = { userId: user.id, username: user.username, role: user.role }
          const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
          
          
          UserModel.updateUser(user.id, {...user, token}, (err, person) => {
            if (err){
              return res.status(500).json({ error: 'Unable to Update User'})
            }
          }) // reset the token

    
          res.status(200).json({ token, ...data });
        });
    }catch(error){
        res.status(500).json({ error, })
    }
  }),

  currentUser: asyncHandler(async (req, res) => {
    res.json(req.user)
    console.log(`Sucessfully logged in`);
    
  }),
};

module.exports = UserController;
