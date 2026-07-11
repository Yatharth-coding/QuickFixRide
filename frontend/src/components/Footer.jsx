import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/project.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <img src="/images/LOGO.png" alt="Logo" id="logo_foter" />
        </div>
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li><Link to="/">Team</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Chat with us</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li><Link to="/">Hire a Driver</Link></li>
            <li><Link to="/">Hire a Temporary Driver</Link></li>
            <li><Link to="/">Hire Hourly Drivers</Link></li>
            <li><Link to="/">Hire Chauffeurs</Link></li>
            <li><Link to="/">3C Offers</Link></li>
            <li><Link to="/">3C Black</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>For Business</h3>
          <ul>
            <li><Link to="/">Hire Drivers for B2B</Link></li>
            <li><Link to="/">Join as Driver Partner</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Cities</h3>
          <ul>
            <li><Link to="/">Bangalore</Link></li>
            <li><Link to="/">Chennai</Link></li>
            <li><Link to="/">Delhi NCR</Link></li>
            <li><Link to="/">Gurgaon</Link></li>
            <li><Link to="/">Hyderabad</Link></li>
            <li><Link to="/">Kolkata</Link></li>
            <li><Link to="/">Mumbai</Link></li>
            <li><Link to="/">Pune</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Compare</h3>
          <ul>
            <li><Link to="/">Ezi Drive</Link></li>
            <li><Link to="/">Top4 Call Drivers</Link></li>
            <li><Link to="/">Driversindia</Link></li>
            <li><Link to="/">Driversonhire</Link></li>
            <li><Link to="/">Get Your Driver</Link></li>
            <li><Link to="/">Drive Assists</Link></li>
            <li><Link to="/">Indian Driver</Link></li>
            <li><Link to="/">Namma Driver</Link></li>
            <li><Link to="/">Driver Suvidha</Link></li>
            <li><Link to="/">Drivers Katta</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="fpara">Terms & Conditions | Privacy Policy | Refund & Cancellation Policy</p>
        <p className="fpara">Car Care Connect Pvt. Ltd. All Rights Reserved<br />
          Headquarter at No.112, Ram janki chaouk krishna nagar, Damoh, Madhya pradesh, 470675.</p>
      </div>
    </footer>
  );
};

export default Footer;
