import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authProvider';
import GoogleAuthButton from '../GoogleAuthButton';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    // Therapist specific fields
    licenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    institution: '',
    verificationDocuments: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      verificationDocuments: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (userType === 'therapist') {
        // Validate therapist-specific fields
        if (!formData.licenseNumber || !formData.specialization || !formData.yearsOfExperience || !formData.verificationDocuments) {
          throw new Error('Please fill in all required therapist information');
        }
      }

      const user = await signup(formData.email, formData.password, {
        displayName: formData.fullName,
        userType,
        ...(userType === 'therapist' && {
          licenseNumber: formData.licenseNumber,
          specialization: formData.specialization,
          yearsOfExperience: formData.yearsOfExperience,
          institution: formData.institution,
          verificationStatus: 'pending'
        })
      });

      // Redirect based on user type
      if (userType === 'therapist') {
        navigate('/therapist-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await googleSignIn();
      // Redirect based on user type
      if (user.userType === 'therapist') {
        navigate('/therapist-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" 
         style={{ 
           background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)',
           animation: 'gradient 15s ease infinite',
           backgroundSize: '400% 400%'
         }}>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .floating {
            animation: floating 3s ease-in-out infinite;
          }
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden floating">
              <div className="card-header bg-success text-white text-center py-3">
                <h2 className="mb-0 fw-bold">Begin Your Journey! 🌈</h2>
                <p className="mb-0 mt-2 small">Take the first step towards better mental health</p>
              </div>
              
              <div className="card-body p-4">
                <div className="mb-3">
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn ${userType === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('user')}
                    >
                      I'm a User
                    </button>
                    <button
                      type="button"
                      className={`btn ${userType === 'therapist' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('therapist')}
                    >
                      I'm a Therapist
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label fw-bold">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person-fill text-success"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope-fill text-success"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-success"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-success"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {userType === 'therapist' && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="licenseNumber" className="form-label fw-bold">License Number</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-file-earmark-text text-success"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="licenseNumber"
                            name="licenseNumber"
                            placeholder="Enter your license number"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="specialization" className="form-label fw-bold">Specialization</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-briefcase-fill text-success"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="specialization"
                            name="specialization"
                            placeholder="Enter your specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="yearsOfExperience" className="form-label fw-bold">Years of Experience</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-calendar-check-fill text-success"></i>
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            id="yearsOfExperience"
                            name="yearsOfExperience"
                            placeholder="Enter years of experience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="institution" className="form-label fw-bold">Institution</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-building-fill text-success"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="institution"
                            name="institution"
                            placeholder="Enter your institution"
                            value={formData.institution}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="verificationDocuments" className="form-label fw-bold">Verification Documents</label>
                        <input
                          type="file"
                          className="form-control"
                          id="verificationDocuments"
                          name="verificationDocuments"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <GoogleAuthButton onClick={handleGoogleSignIn} text="Sign up with Google" />
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p className="mb-1">
                    Already have an account?{' '}
                    <Link to="/login" className="text-success fw-bold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;