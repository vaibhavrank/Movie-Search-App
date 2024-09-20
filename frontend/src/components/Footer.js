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
          <p>Email: info@movieapp.com</p>
          <p>Phone: +91 9687798433</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p><a className=' no-underline ' href='https://www.linkedin.com/in/vaibhav-rank-366958302/'>Linked in</a> | <a href='tagram.com/____vaibhav_patel_/'>Instagram</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MovieApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;