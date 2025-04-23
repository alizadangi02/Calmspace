import { useAuth } from '../../utils/authProvider';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TherapistDashboard = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear stored user (example logic)
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="container py-5">
      {/* Hamburger Button */}
      <div className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1200 }}>
        <button 
          className="btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            fontSize: '2rem',
            padding: '0.5rem',
            background: 'transparent',
            border: 'none'
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Sliding Quick Actions Menu */}
      <div 
        className="position-fixed top-0 start-0 h-100 bg-white shadow"
        style={{
          width: '250px',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1100
        }}
      >
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="text-primary mb-0">Quick Actions</h6>
            {/* Close Menu Button */}
            <button 
              className="btn btn-sm"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: '1.5rem',
                background: 'transparent',
                border: 'none'
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="d-grid gap-3">
            <Link to="/schedule" className="btn btn-outline-primary text-start" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-calendar-plus me-2"></i>
              Schedule Session
            </Link>

            <Link to="/clients" className="btn btn-outline-primary text-start" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-person-plus me-2"></i>
              Add New Client
            </Link>

            <Link to="/notes" className="btn btn-outline-primary text-start" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-journal-text me-2"></i>
              Session Notes
            </Link>

            <Link to="/chat" className="btn btn-outline-primary text-start" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-chat-dots me-2"></i>
              Chat
            </Link>

            <button 
              className="btn btn-outline-danger text-start"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Welcome Section */}
        <div className="col-12 mb-4">
          <div className="card fade-in">
            <div className="card-body text-center py-5">
              <h1 className="display-4 mb-3">Welcome, Dr. {user?.displayName}</h1>
              <p className="lead text-muted">
                Your therapist dashboard for managing clients and sessions
              </p>
              {user?.verificationStatus === 'pending' && (
                <div className="alert alert-warning mt-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Your account is pending verification. We'll review your credentials and notify you soon.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-12 mb-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card fade-in h-100">
                <div className="card-body text-center">
                  <i className="bi bi-people display-4 text-primary mb-3"></i>
                  <h3 className="h5">Active Clients</h3>
                  <p className="display-6 text-primary mb-0">15</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card fade-in h-100">
                <div className="card-body text-center">
                  <i className="bi bi-calendar-check display-4 text-primary mb-3"></i>
                  <h3 className="h5">Upcoming Sessions</h3>
                  <p className="display-6 text-primary mb-0">8</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card fade-in h-100">
                <div className="card-body text-center">
                  <i className="bi bi-clock-history display-4 text-primary mb-3"></i>
                  <h3 className="h5">Hours This Week</h3>
                  <p className="display-6 text-primary mb-0">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="col-12 mb-4">
          <div className="card fade-in h-100">
            <div className="card-body">
              <h4 className="h5 mb-4">Today's Schedule</h4>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Sarah Johnson</h6>
                      <small className="text-muted">Individual Session</small>
                    </div>
                    <span className="badge bg-primary">10:00 AM</span>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Support Group</h6>
                      <small className="text-muted">Anxiety Management</small>
                    </div>
                    <span className="badge bg-primary">2:00 PM</span>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Michael Chen</h6>
                      <small className="text-muted">Follow-up Session</small>
                    </div>
                    <span className="badge bg-primary">4:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TherapistDashboard;
