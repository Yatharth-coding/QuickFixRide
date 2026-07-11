import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://quickfixride-backend.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <span>3C</span>
          </div>
          <h2>Car Care Connect</h2>
        </div>
        <div className="auth-form">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" style={{ width: '350px' }}>Sign in</button>
          </form>
          <br />
          <hr />
          <p className="signup-link">
            <button id="create-an-acc" style={{ color: '#374151' }}>
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Create an account</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
