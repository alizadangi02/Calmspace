import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="no-underline">
      <div className="flex items-center">
        <div className="relative">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:from-purple-600 hover:to-indigo-600">
            Calm
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 ml-1">
            Space
          </span>
          <div 
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"
            style={{
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo; 