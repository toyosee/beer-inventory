// authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return true; // Login successful
  } catch (error) {
    console.error(error);
    return false; // Login failed
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if a token is present, indicating the user is authenticated
};
