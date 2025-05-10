import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import webRTCService from '../services/webrtc';
import PremiumModal from './PremiumModal';
import { updateTrialTime } from '../store/slices/userSlice';

const VideoChat = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  
  const { isPremium, trialTimeRemaining, gender, genderPreference } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');
    
    socketRef.current.on('connect', () => {
      console.log('Connected to signaling server');
    });

    let timer;
    if (!isPremium && trialTimeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(updateTrialTime(trialTimeRemaining - 1));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      socketRef.current?.disconnect();
      webRTCService.closeConnection();
    };
  }, [isPremium, trialTimeRemaining]);

  const startChat = async () => {
    if (!isPremium && genderPreference !== 'any') {
      setShowPremiumModal(true);
      return;
    }

    try {
      setIsConnecting(true);
      const stream = await webRTCService.initializeMedia();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      await webRTCService.createPeerConnection();
      socketRef.current.emit('user:join', {
        preferences: { gender, genderPreference }
      });
      setIsChatting(true);
    } catch (error) {
      console.error('Error starting chat:', error);
      setIsConnecting(false);
    }
  };

  const skipUser = () => {
    webRTCService.closeConnection();
    setIsChatting(false);
    startChat();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit('message', message);
      setMessages(prev => [...prev, { text: message, sent: true }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full bg-black rounded-lg"
              />
              <span className="absolute bottom-2 left-2 text-white">You</span>
            </div>
            <div className="relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full bg-black rounded-lg"
              />
              <span className="absolute bottom-2 left-2 text-white">Stranger</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={isChatting ? skipUser : startChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              disabled={isConnecting}
            >
              {isChatting ? 'Skip' : 'Start Chat'}
            </button>
            <button
              onClick={() => webRTCService.closeConnection()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              End Chat
            </button>
          </div>

          <div className="mt-4">
            <div className="h-40 overflow-y-auto bg-white rounded-lg p-4 mb-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sent ? 'text-right' : 'text-left'}`}
                >
                  <span className={`inline-block p-2 rounded-lg ${
                    msg.sent ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {showPremiumModal && (
        <PremiumModal onClose={() => setShowPremiumModal(false)} />
      )}
    </div>
  );
};

export default VideoChat;