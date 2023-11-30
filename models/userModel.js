const db = require('../config/dbConnection');

const UserModel = {
  getUsers: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },
  
  createUser: (user, callback) => {
    const { username, password, full_name, email, role } = user;
    const query = 'INSERT INTO users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)';
    const values = [username, password, full_name, email, role];
    db.query(query, values, callback);
  },
  
  getUserById: (userId, callback) => {
    const query = "SELECT * FROM users WHERE user_id = ?";
    db.query(query, [userId], callback);
  },
  
  getUserByToken: (token, callback) => {
    const query = "SELECT * FROM users WHERE token = ?";
    db.query(query, [token], callback);
  },
  
  updateUser: (userId, user, callback) => {
    const { username, password, full_name, email, role } = user;
    const query = "UPDATE users SET `username` = ?, `password` = ?, `full_name` = ?, `email` = ?, `role` = ? `token` = ? WHERE user_id = ?";
    const values = [username, password, full_name, email, role, userId, token];
    db.query(query, values, callback);
  },
  
  deleteUser: (userId, callback) => {
    const query = "DELETE FROM users WHERE user_id = ?";
    db.query(query, [userId], callback);
  },
  
  getUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },
};

module.exports = UserModel;
