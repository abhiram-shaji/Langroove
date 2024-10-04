// /hooks/useChat.ts

import { useState } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

export const useChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'Hi there!', sender: 'me' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random().toString(), text: message, sender: 'me' },
      ]);
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return { message, setMessage, messages, sendMessage };
};
