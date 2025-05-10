import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isPremium, trialTimeRemaining } = useSelector(state => state.user);
  const onlineUsers = 33451; // This would come from your backend in production

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">BLUC</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="text-gray-600">
              Talk to strangers! {onlineUsers} + online now
            </div>
            
            {!isPremium && trialTimeRemaining > 0 && (
              <div className="text-sm text-gray-500">
                Trial: {Math.floor(trialTimeRemaining / 60)}:
                {(trialTimeRemaining % 60).toString().padStart(2, '0')}
              </div>
            )}
            
            <Link
              to="/premium"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Premium
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;