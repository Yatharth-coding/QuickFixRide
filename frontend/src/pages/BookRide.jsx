import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const BookRide = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showPrices, setShowPrices] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const mapRef = useRef(null);
  const routeControlRef = useRef(null);
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([28.2380, 83.9956], 11);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const geocodeLocation = (location, callback) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data[0]) {
          callback(L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon)));
        } else {
          callback(null);
        }
      })
      .catch(err => {
        console.error('Geocoding error:', err);
        callback(null);
      });
  };

  const handleRoute = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      showSnackbar('Please enter both pickup and dropoff locations.', 'error');
      return;
    }

    geocodeLocation(pickup, (pickupLatLng) => {
      geocodeLocation(dropoff, (dropoffLatLng) => {
        if (pickupLatLng && dropoffLatLng) {
          if (routeControlRef.current) {
            routeControlRef.current.setWaypoints([pickupLatLng, dropoffLatLng]);
          } else {
            routeControlRef.current = L.Routing.control({
              waypoints: [pickupLatLng, dropoffLatLng],
              routeWhileDragging: true,
              collapsible: true,
              show: false
            }).addTo(mapRef.current);
            
            routeControlRef.current.on('routesfound', function(e) {
              const routes = e.routes;
              const distanceInKm = routes[0].summary.totalDistance / 1000;
              // Base price $2 + $1.5 per km
              setEstimatedPrice(Math.floor(2 + (1.5 * distanceInKm)));
            });
          }
          mapRef.current.setView(pickupLatLng, 6);
        } else {
          showSnackbar('Unable to find one or both locations.', 'error');
        }
      });
    });
  };

  const handleSeePrices = () => {
    localStorage.setItem('ride_pickup', pickup);
    localStorage.setItem('ride_dropoff', dropoff);
    localStorage.setItem('ride_date', date);
    localStorage.setItem('ride_time', time);
    
    // Use estimated price calculated from routing
    if (pickup && dropoff && estimatedPrice) {
      if (!date || !time) {
        showSnackbar("Please select date and time.", 'error');
        return;
      }
      setShowPrices(true);
    } else {
      showSnackbar("Please enter pickup and dropoff locations and click Show Route first.", 'error');
    }
    // navigate('/book-ride-prices')
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showSnackbar("Please login first to book a ride.", 'error');
      navigate('/login');
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
          serviceType: 'ride',
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          date,
          time,
          price: estimatedPrice
        })
      });

      const data = await response.json();
      if (data.success) {
        showSnackbar('Ride Booked Successfully! Redirecting to Dashboard...', 'success');
        setShowPrices(false);
        navigate('/dashboard');
      } else {
        showSnackbar(data.error || 'Failed to book ride', 'error');
      }
    } catch (err) {
      console.error(err);
      showSnackbar('An error occurred while booking.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="booking-section" style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
        <div className="booking-form" style={{ width: '50%' }}>
          <h1 style={{ fontSize: '2.0rem' }}>Service starts right where you stand !!</h1>
          <form onSubmit={handleRoute}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Pickup location</label>
              <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup location" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Dropoff location</label>
              <input type="text" value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="Enter dropoff location" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div className="bottom_button" style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#000', color: '#fff' }}>Show Route</button>
              <button type="button" onClick={handleSeePrices} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#000', color: '#fff' }}>See prices</button>
            </div>
          </form>

          {showPrices && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>Estimated Prices</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Economy</h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Standard 4-seater</p>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${estimatedPrice}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Premium</h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Luxury vehicles</p>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${Math.floor(estimatedPrice * 1.5)}</div>
                </div>
                <button 
                  onClick={handleBooking}
                  style={{ width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
        <div id="map" style={{ width: '45%', height: '600px', border: '0.3rem solid black', borderRadius: '23px', marginTop: '1.2rem' }}></div>
      </main>
      <Chatbot />
      <Footer />
    </>
  );
};

export default BookRide;
