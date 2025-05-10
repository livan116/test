import React from 'react';
import { useDispatch } from 'react-redux';
import { setPremium } from '../store/slices/userSlice';

const PremiumModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubscribe = (plan) => {
    // In production, this would integrate with a payment gateway
    dispatch(setPremium(true));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Upgrade to Premium</h2>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer"
               onClick={() => handleSubscribe('daily')}>
            <h3 className="font-semibold">Daily Pass</h3>
            <p className="text-gray-600">$2.99/day</p>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer"
               onClick={() => handleSubscribe('weekly')}>
            <h3 className="font-semibold">Weekly Pass</h3>
            <p className="text-gray-600">$9.99/week</p>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer bg-blue-50"
               onClick={() => handleSubscribe('monthly')}>
            <h3 className="font-semibold">Monthly Pass</h3>
            <p className="text-gray-600">$19.99/month</p>
            <p className="text-sm text-blue-600">Best Value!</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-6 w-full py-2 text-gray-600 hover:text-gray-800"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default PremiumModal;