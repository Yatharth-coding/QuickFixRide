import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import BookRide from './pages/BookRide';
import NearbyService from './pages/NearbyService';
import Dashboard from './pages/Dashboard';
import CarWash from './pages/CarWash';
import ContactUs from './pages/ContactUs';
import Team from './pages/Team';
import JoinDriver from './pages/JoinDriver';
import ServiceHistory from './pages/ServiceHistory';
import RideHistory from './pages/RideHistory';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/contact" element={<ContactUs />} />
          <Route path="/about/blog" element={<Placeholder title="3C Blog" />} />
          <Route path="/business/join-driver" element={<JoinDriver />} />
          <Route path="/business/hire-drivers" element={<Placeholder title="Hire Drivers for B2B" />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/book-ride" element={<ProtectedRoute><BookRide /></ProtectedRoute>} />
          <Route path="/nearby-service" element={<ProtectedRoute><NearbyService /></ProtectedRoute>} />
          <Route path="/car-wash" element={<ProtectedRoute><CarWash /></ProtectedRoute>} />
          <Route path="/service-history" element={<ProtectedRoute><ServiceHistory /></ProtectedRoute>} />
          <Route path="/ride-history" element={<ProtectedRoute><RideHistory /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
