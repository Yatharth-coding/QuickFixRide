import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', email: '', id: null });

  // Simulate fetching profiles
  useEffect(() => {
    // In a real app, you would fetch this from /api/users
    setProfiles([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
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
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleEdit(profile)} style={{ marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDelete(profile.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
