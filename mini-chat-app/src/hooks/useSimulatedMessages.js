// hooks/useSimulatedMessages.js
import { useEffect, useRef, useState } from 'react';

const SAMPLE_MESSAGES = {
  general: [
    "Hey everyone! 👋",
    "How's it going?",
    "Just joined the room",
    "Working on something interesting",
    "Anyone here?",
    "Great discussion!",
    "Thanks for sharing",
    "I agree with that",
    "Let's discuss this further",
    "Interesting point!",
  ],
  random: [
    "Random thought: What if... 🤔",
    "Anyone up for a game?",
    "Just sharing some random stuff",
    "This is fun!",
    "Random fact of the day!",
    "Anyone else bored?",
    "Let's talk about something random",
    "Random question: What's your favorite...?",
    "Just dropping by!",
    "Random chat time!",
  ]
};

export const useSimulatedMessages = (activeRoom) => {
  const [messages, setMessages] = useState([]);
  const counter = useRef(0);
  const lastMessageTime = useRef(Date.now());
  const messageInterval = useRef(null);

  useEffect(() => {
   
    if (messageInterval.current) {
      clearInterval(messageInterval.current);
    }

    const simulateMessage = () => {
      const now = Date.now();
      // Only add a new message if at least 8-15 seconds have passed since the last one
      const minDelay = 8000; // 8 seconds
      const maxDelay = 15000; // 15 seconds
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      if (now - lastMessageTime.current >= randomDelay) {
        counter.current += 1;
        const roomMessages = SAMPLE_MESSAGES[activeRoom] || SAMPLE_MESSAGES.general;
        const randomMessage = roomMessages[Math.floor(Math.random() * roomMessages.length)];
        
        const newMessage = {
          id: `${activeRoom}-${counter.current}`,
          room: activeRoom,
          text: randomMessage,
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => {
          if (newMessage.room === activeRoom) {
            lastMessageTime.current = now;
            return [...prev, newMessage];
          }
          return prev;
        });
      }
    };

    
    messageInterval.current = setInterval(simulateMessage, 3000);
    return () => {
      if (messageInterval.current) {
        clearInterval(messageInterval.current);
      }
    };
  }, [activeRoom]);
  return [messages, setMessages];
};
