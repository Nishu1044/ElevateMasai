// components/ChatApp.jsx
import React, { useState } from 'react';
import ChatRoom from './ChatRoom';

const ChatApp = () => {
  const [activeRoom, setActiveRoom] = useState('general');

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          onClick={() => setActiveRoom('general')}
          className={`px-4 py-2 mx-1 rounded ${activeRoom === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          #general
        </button>
        <button
          onClick={() => setActiveRoom('random')}
          className={`px-4 py-2 mx-1 rounded ${activeRoom === 'random' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          #random
        </button>
      </div>

      <ChatRoom room={activeRoom} />
    </div>
  );
};

export default ChatApp;
