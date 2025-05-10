import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInterests, setGender, setGenderPreference } from '../store/slices/userSlice';

const Home = () => {
  const [interests, setLocalInterests] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStartChat = (type) => {
    dispatch(setInterests(interests.split(',').map(i => i.trim())));
    navigate('/chat');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">WARNING!</h1>
          <h2 className="text-xl font-semibold mb-2">VIDEO MONITORING</h2>
          <h3 className="text-lg font-medium">STAY IN THE ROOM</h3>
        </div>

        <p className="text-center mb-6">
          BLUC (video)chat is a great way to meet new friends. When you use BLUC,
          we pick someone else at random and let you talk one-on-one.
        </p>

        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-center text-blue-700">
            ⚠️ Video is monitored. Keep it clean
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">What do you wanna talk about?</h4>
          <input
            type="text"
            value={interests}
            onChange={(e) => setLocalInterests(e.target.value)}
            placeholder="Add your interests (press Enter)"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleStartChat('text')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
          >
            Text
          </button>
          <button
            onClick={() => handleStartChat('video')}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;