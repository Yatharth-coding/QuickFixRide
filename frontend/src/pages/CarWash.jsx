import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

const CarWash = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [packageType, setPackageType] = useState('basic');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const prices = {
    basic: 20,
    premium: 40,
    full_detail: 80
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
              showSnackbar("Location fetched successfully!", 'success');
            } else {
              showSnackbar("Failed to reverse geocode location.", 'error');
            }
          } catch (error) {
            showSnackbar("Failed to fetch location data.", 'error');
          }
          setLoadingLocation(false);
        },
        () => {
          setLoadingLocation(false);
          showSnackbar("Failed to get current location. Please allow location access.", 'error');
        }
      );
    } else {
      showSnackbar("Geolocation is not supported by your browser.", 'error');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      showSnackbar("Please login first to book a car wash.", 'error');
      navigate('/login');
      return;
    }
    if (!date || !time || !address) {
      showSnackbar("Please fill out all required fields.", 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceType: 'car_wash',
          mechanicName: `Car Wash - ${packageType.replace('_', ' ').toUpperCase()}`, // Reusing schema field
          mechanicAddress: address, // Reusing schema field
          date,
          time,
          price: prices[packageType]
        })
      });

      const data = await response.json();
      if (data.success) {
        showSnackbar('Car Wash Booked Successfully! Redirecting to Dashboard...', 'success');
        navigate('/dashboard');
      } else {
        showSnackbar(data.error || 'Failed to book car wash', 'error');
      }
    } catch (err) {
      console.error(err);
      showSnackbar('An error occurred while booking.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f9fafb', minHeight: '80vh', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', color: '#111827' }}>Doorstep Car Wash</h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Eco-friendly pressure wash by professionals right at your doorstep.</p>
          
          <form onSubmit={handleBooking}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Your Address</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your home or office address"
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
                />
                <button 
                  type="button" 
                  onClick={getCurrentLocation}
                  disabled={loadingLocation}
                  style={{ backgroundColor: '#10b981', color: 'white', padding: '0 1rem', border: 'none', borderRadius: '4px', cursor: loadingLocation ? 'not-allowed' : 'pointer', fontWeight: '500', whiteSpace: 'nowrap' }}
                >
                  {loadingLocation ? 'Locating...' : '📍 Use Current Location'}
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Select Package</label>
              <select 
                value={packageType}
                onChange={e => setPackageType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: 'white' }}
              >
                <option value="basic">Basic Exterior Wash - ${prices.basic}</option>
                <option value="premium">Premium Wash & Interior Vacuum - ${prices.premium}</option>
                <option value="full_detail">Full Detailing & Wax - ${prices.full_detail}</option>
              </select>
            </div>

            <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              Book Now (${prices[packageType]})
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarWash;
