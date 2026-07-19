import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Team = () => {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f9fafb', minHeight: '80vh', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', color: '#111827' }}>Meet Our Team</h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1.2rem' }}>The passionate people driving QuickFixRide forward.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Team Member 1 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '50%', margin: '0 auto 1.5rem auto', overflow: 'hidden' }}>
                <img src="/images/free-user-icon-3296-thumb.png" alt="CEO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827' }}>Yatharth Yadav</h3>
              <p style={{ color: '#3b82f6', fontWeight: '500', marginBottom: '1rem' }}>Founder & CEO</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Yatharth leads our vision to revolutionize vehicle services across the nation.</p>
            </div>

            {/* Team Member 2 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '50%', margin: '0 auto 1.5rem auto', overflow: 'hidden' }}>
                <img src="/images/free-user-icon-3296-thumb.png" alt="CTO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827' }}>Shubham Sharma</h3>
              <p style={{ color: '#3b82f6', fontWeight: '500', marginBottom: '1rem' }}>Chief Technology Officer</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Shubham engineers the scalable infrastructure that powers the QuickFixRide platform.</p>
            </div>

            {/* Team Member 3 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '50%', margin: '0 auto 1.5rem auto', overflow: 'hidden' }}>
                <img src="/images/free-user-icon-3296-thumb.png" alt="COO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827' }}>Emily Johnson</h3>
              <p style={{ color: '#3b82f6', fontWeight: '500', marginBottom: '1rem' }}>Chief Operating Officer</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Emily ensures that our mechanics and drivers deliver top-tier service every time.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
