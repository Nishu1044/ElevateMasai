// components/ChatRoom.jsx
import React, { useState, useEffect } from 'react';
import { useSimulatedMessages } from '../hooks/useSimulatedMessages';
import MessageList from './MessageList';

const ChatRoom = ({ room }) => { 
  const [messages, setMessages] = useSimulatedMessages(room);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: `${room}-${Date.now()}`,
        room: room,
        text: input.trim(),
        sender: 'You'
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');

  
      setIsTyping(true);
     
      
    }
  };

  useEffect(() => {
  let typingTimer;
  if (isTyping) {
    typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  }
  return () => clearTimeout(typingTimer);
}, [isTyping]);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  const roomMessages = messages.filter(msg => msg.room === room);

  return (
    <div className="flex flex-col h-96 w-full max-w-md bg-white rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Room: {room}</h2>
    
      <MessageList messages={roomMessages} />

      {isTyping && <div className="text-gray-500 text-sm mb-2">Someone is typing...</div>}

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-600 text-white rounded-r px-4 py-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;