import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authProvider';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { toast, Toaster } from 'react-hot-toast';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    // Show confetti for 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    // Show toast when dashboard loads
    toast.success(`Namaste, ${user?.email?.split('@')[0] || 'Friend'}! 🎉`);
    return () => clearTimeout(timer);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const features = [
    { title: 'Mood Analytics', description: 'Track and analyze your emotional patterns', link: '/mood' },
    { title: 'Sleep Analysis', description: 'Monitor and optimize your sleep quality', link: '/sleep' },
    { title: 'Mindfulness', description: 'Practice breathing techniques for focus', link: '/breathing-game' },
    { title: 'Community', description: 'Engage with like-minded individuals', link: '/blogs' },
    { title: 'Performance', description: 'Track your wellness journey progress', link: '/sgraph' },
    { title: 'Insights', description: 'View detailed analytics and patterns', link: '/mgraph' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800 relative">
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
          gravity={0.3}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Navigation */}
      <div className="absolute top-0 right-0 p-6 z-10">
        <div className="flex items-center space-x-4">
          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-2 text-sm font-medium text-purple-700 hover:bg-white/90 transition-all duration-300 shadow-md"
            >
               Profile
            </motion.div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-full px-6 py-2 text-sm font-medium text-red-600 hover:bg-white/90 transition-all duration-300 shadow-md"
          >
             Logout
          </motion.button>
        </div>
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-purple-700 mb-4 tracking-tight"
          >
            Namaste, {user?.email?.split('@')[0] || 'User'}! 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-md text-purple-600 font-light tracking-wide"
          >
            
          </motion.p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={feature.link} className="block">
                <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-6 transition-all duration-500 hover:bg-white">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                    <h3 className="text-xl font-semibold text-purple-700">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-purple-600 font-light leading-relaxed pl-5">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">
            🌟 Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-purple-100 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-sm font-light text-purple-500 mb-2">Consistency</h3>
              <p className="text-2xl font-semibold text-purple-700">7 days</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-purple-100 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-sm font-light text-purple-500 mb-2">Sleep Quality</h3>
              <p className="text-2xl font-semibold text-purple-700">7.5 hrs</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-purple-100 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-sm font-light text-purple-500 mb-2">Engagement</h3>
              <p className="text-2xl font-semibold text-purple-700">12</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
