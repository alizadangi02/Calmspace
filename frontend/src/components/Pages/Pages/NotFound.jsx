import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card fade-in">
            <div className="card-body py-5">
              <h1 className="display-1 text-primary mb-4">404</h1>
              <h2 className="h3 mb-4">Page Not Found</h2>
              <p className="text-muted mb-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <Link to="/" className="btn btn-primary">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 