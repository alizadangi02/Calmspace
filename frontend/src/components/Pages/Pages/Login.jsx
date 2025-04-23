import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authProvider';
import GoogleAuthButton from '../GoogleAuthButton';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      if (user.userType === 'therapist') {
        navigate('/therapist-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await googleSignIn();
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
              <div className="card-header bg-primary text-white text-center py-3">
                <h2 className="mb-0 fw-bold">Welcome Back! 🌟</h2>
                <p className="mb-0 mt-2 small">Your journey to wellness continues here</p>
              </div>
              
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope-fill text-primary"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-primary"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <GoogleAuthButton onClick={handleGoogleSignIn} text="Sign in with Google" />
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p className="mb-1">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary fw-bold">
                      Sign up
                    </Link>
                  </p>
                  <Link to="/forgot-password" className="text-muted small">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;