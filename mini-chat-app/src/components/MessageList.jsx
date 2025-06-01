import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); 

  return (
    <div className="flex-1 overflow-y-auto border p-2 rounded-md bg-gray-50">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`mb-3 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
        >
          <div className={`inline-block max-w-[80%] ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg shadow-sm`}>
            <div className="px-3 py-2">
              <div className="text-sm">{message.text}</div>
              <div className={`text-xs mt-1 ${message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
