import React from 'react';
import { useAuth } from '../../utils/authProvider';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card fade-in h-100">
            <div className="card-body">
              <h3 className="h5 mb-3">Welcome, {user?.displayName || 'User'}!</h3>
              <p className="text-muted mb-4">
                Your mental health journey starts here. Track your progress and find support.
              </p>
              <div className="d-grid gap-2">
                <Link to="/profile" className="btn btn-outline-primary">
                  View Profile
                </Link>
                <Link to="/settings" className="btn btn-outline-secondary">
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card fade-in h-100">
                <div className="card-body">
                  <h4 className="h5 mb-3">Quick Actions</h4>
                  <div className="d-grid gap-2">
                    <Link to="/mood" className="btn btn-primary">
                      <i className="bi bi-emoji-smile me-2"></i>
                      Log Mood
                    </Link>
                    <Link to="/sleep" className="btn btn-primary">
                      <i className="bi bi-moon-stars me-2"></i>
                      Track Sleep
                    </Link>
                    <Link to="/breathing" className="btn btn-primary">
                      <i className="bi bi-wind me-2"></i>
                      Breathing Exercise
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card fade-in h-100">
                <div className="card-body">
                  <h4 className="h5 mb-3">Recent Activity</h4>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Mood Logged</span>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Sleep Tracked</span>
                        <small className="text-muted">Yesterday</small>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Breathing Exercise</span>
                        <small className="text-muted">2 days ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card fade-in">
                <div className="card-body">
                  <h4 className="h5 mb-3">Resources & Support</h4>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-journal-text display-4 text-primary mb-3"></i>
                          <h5 className="card-title">Articles</h5>
                          <p className="card-text">Read helpful articles about mental health and wellness.</p>
                          <Link to="/articles" className="btn btn-outline-primary btn-sm">
                            Browse Articles
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-people display-4 text-primary mb-3"></i>
                          <h5 className="card-title">Community</h5>
                          <p className="card-text">Connect with others and share your experiences.</p>
                          <Link to="/community" className="btn btn-outline-primary btn-sm">
                            Join Community
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-calendar-check display-4 text-primary mb-3"></i>
                          <h5 className="card-title">Appointments</h5>
                          <p className="card-text">Schedule sessions with mental health professionals.</p>
                          <Link to="/appointments" className="btn btn-outline-primary btn-sm">
                            Book Session
                          </Link>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
