import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;

