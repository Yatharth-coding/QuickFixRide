import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import BookRide from './pages/BookRide';
import NearbyService from './pages/NearbyService';
import Dashboard from './pages/Dashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Placeholder = ({ title }) => (
  <>
    <Navbar />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#374151', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>This page is currently under development. Please check back later!</p>
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/nearby-service" element={<NearbyService />} />
          <Route path="/car-wash" element={<Placeholder title="Car Wash Services" />} />
          <Route path="/business/join-driver" element={<Placeholder title="Join as Driver Partner" />} />
          <Route path="/business/hire-drivers" element={<Placeholder title="Hire Drivers for B2B" />} />
          <Route path="/about/team" element={<Placeholder title="Our Team" />} />
          <Route path="/about/blog" element={<Placeholder title="3C Blog" />} />
          <Route path="/about/contact" element={<Placeholder title="Contact Us" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
