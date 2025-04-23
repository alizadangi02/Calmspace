import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../utils/authProvider';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Mental wellness enthusiast and mindfulness practitioner',
    goals: ['Daily meditation', 'Better sleep', 'Stress management']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6 text-gray-800">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 backdrop-blur-lg border border-purple-200 rounded-2xl shadow-lg p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-purple-300 flex items-center justify-center text-5xl font-bold text-white shadow-inner">
                {user?.name?.[0]?.toUpperCase() || '👤'}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600">
                  <span className="text-white">📷</span>
                </button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-3xl font-bold bg-purple-100 rounded-xl px-4 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2 text-purple-700">{formData.name}</h1>
              )}
              <p className="text-gray-500 mb-4">{formData.email}</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
                  className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all shadow-md"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                <button
                  onClick={logout}
                  className="px-5 py-2 bg-red-400 hover:bg-red-500 text-white rounded-xl transition-all shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-lg border border-purple-200 rounded-2xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">About Me</h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full h-32 bg-purple-100 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">{formData.bio}</p>
          )}
        </motion.div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-lg border border-purple-200 rounded-2xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">My Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.goals.map((goal, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-purple-100 rounded-xl p-4 shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center mr-4 font-bold text-lg">
                  ✓
                </div>
                <span className="text-gray-700">{goal}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-white/70 backdrop-blur-lg border border-purple-200 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">My Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Days Streak', value: '7' },
              { label: 'Meditation Hours', value: '24' },
              { label: 'Sleep Quality', value: '85%' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-purple-100 rounded-xl p-6 text-center shadow-md"
              >
                <div className="text-3xl font-bold text-purple-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
