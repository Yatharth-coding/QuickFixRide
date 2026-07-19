import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from '../context/SnackbarContext';
import '../assets/css/styles.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      showSnackbar('Account created successfully!', 'success');
      navigate('/');
    } catch (err) {
      showSnackbar(err.response?.data?.error || 'Signup failed', 'error');
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <span>3C</span>
          </div>
          <h2>Create Account</h2>
        </div>
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" style={{ width: '350px' }}>Sign up</button>
          </form>
          <br />
          <hr />
          <p className="signup-link">
            <button id="create-an-acc" style={{ color: '#374151' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Already have an account? Log in</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
