import React from 'react';
import { useDispatch } from 'react-redux';
import { setGender, setGenderPreference } from '../store/slices/userSlice';

const GenderSelector = ({ onComplete }) => {
  const dispatch = useDispatch();

  const handleGenderSelect = (gender) => {
    dispatch(setGender(gender));
  };

  const handlePreferenceSelect = (preference) => {
    dispatch(setGenderPreference(preference));
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-40">
      <div className="max-w-md w-full p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Complete Your Profile</h2>
        
        <div className="mb-8">
          <h3 className="text-lg mb-4">I am a:</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleGenderSelect('male')}
              className="p-6 border rounded-lg hover:bg-blue-50"
            >
              👨 Male
            </button>
            <button
              onClick={() => handleGenderSelect('female')}
              className="p-6 border rounded-lg hover:bg-pink-50"
            >
              👩 Female
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-4">I want to talk to:</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handlePreferenceSelect('male')}
              className="p-4 border rounded-lg hover:bg-blue-50"
            >
              Males
            </button>
            <button
              onClick={() => handlePreferenceSelect('female')}
              className="p-4 border rounded-lg hover:bg-pink-50"
            >
              Females
            </button>
            <button
              onClick={() => handlePreferenceSelect('any')}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              Anyone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenderSelector;