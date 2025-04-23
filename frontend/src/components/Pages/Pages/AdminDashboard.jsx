import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">Manage user accounts and permissions</p>
                  <button className="btn btn-primary">View Users</button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Therapists</h5>
                  <p className="card-text">Manage therapist accounts and verifications</p>
                  <button className="btn btn-primary">View Therapists</button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Reports</h5>
                  <p className="card-text">View system reports and analytics</p>
                  <button className="btn btn-primary">View Reports</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 