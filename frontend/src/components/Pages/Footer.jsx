import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>CalmSpace</h5>
            <p className="text-muted">Your mental wellness companion</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/profile" className="text-white">Profile</Link></li>
              <li><Link to="/settings" className="text-white">Settings</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:support@calmspace.com" className="text-white">support@calmspace.com</a></li>
              <li><a href="tel:+1234567890" className="text-white">+1 (234) 567-890</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} CalmSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 