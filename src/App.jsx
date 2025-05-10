import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoChat from './components/VideoChat';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<VideoChat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;