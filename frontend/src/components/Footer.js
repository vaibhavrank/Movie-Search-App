import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are passionate about bringing you the best movie information.</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@movieapp.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Facebook | Twitter | Instagram</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MovieApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;