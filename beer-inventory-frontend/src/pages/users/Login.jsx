import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Update the path accordingly

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        onLogin(); // Trigger the callback to set isLoggedIn to true
        navigate('/beer'); // Redirect to the dashboard page
      } else {
        // Handle login error here (display an error message, etc.)
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
      // Handle other errors (network issues, server errors, etc.)
    }
  };

  return (
    <div className='form contMargin'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>Username</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              type='text'
              name='username'
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
              value={formData.username}
            />
          </InputGroup>
        </div>
        <br />
        <div>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>Password</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              type='password'
              name='password'
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
              value={formData.password}
            />
          </InputGroup>
        </div>
        <br />
        <Button type='submit' className='btn-extra'>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
