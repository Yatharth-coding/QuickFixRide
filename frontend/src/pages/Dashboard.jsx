import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', email: '', id: null });

  // Fetch user profile and bookings
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await fetch('http://localhost:3001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setProfiles([{ id: data.data._id, name: data.data.name, email: data.data.email }]);
        }

        const bookingsResponse = await fetch('http://localhost:3001/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setBookings(bookingsData.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const handleSave = () => {
    setProfiles(profiles.map(p => (p.id === editUser.id ? editUser : p)));
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard" style={{ padding: '20px', minHeight: '60vh' }}>
        <h1>Latest Profile Dashboard</h1>
        
        <table id="profilesTable" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{profile.name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{profile.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button onClick={() => handleEdit(profile)} style={{ display: 'inline-block', marginRight: '10px', padding: '8px 16px', backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(profile.id)} style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: '40px' }}>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Type</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Details</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Date & Time</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Price</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textTransform: 'capitalize' }}>
                    {booking.serviceType === 'ride' ? '🚕 Ride' : '🔧 Mechanic'}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {booking.serviceType === 'ride' 
                      ? `${booking.pickupLocation} → ${booking.dropoffLocation}`
                      : `${booking.mechanicName} (${booking.mechanicAddress})`}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.date} at {booking.time}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>${booking.price}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      backgroundColor: booking.status === 'confirmed' ? '#dcfce7' : '#f3f4f6',
                      color: booking.status === 'confirmed' ? '#166534' : '#374151'
                    }}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-content" style={{ backgroundColor: '#fefefe', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '300px' }}>
            <span className="close" onClick={() => setIsModalOpen(false)} style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }}>&times;</span>
            <h2>Edit Profile</h2>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="editName" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
              <input 
                type="text" 
                id="editName" 
                value={editUser.name} 
                onChange={(e) => setEditUser({...editUser, name: e.target.value})} 
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="editEmail" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
              <input 
                type="email" 
                id="editEmail" 
                value={editUser.email} 
                readOnly 
                style={{ width: '100%', padding: '8px', backgroundColor: '#eee' }}
              />
            </div>
            <button id="saveButton" onClick={handleSave} style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default Dashboard;
