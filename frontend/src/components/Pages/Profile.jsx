import React from 'react';
import { useAuth } from '../../utils/authProvider';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <p className="mt-1 text-lg text-gray-900">{user.uid}</p>
            </div>
            {/* Add more user information fields as needed */}
          </div>
        ) : (
          <p className="text-gray-600">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile; 