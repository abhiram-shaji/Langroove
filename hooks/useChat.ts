import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Firestore database import
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase'; // Firebase Auth import

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

export const useChat = (recipientId: string) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = auth.currentUser; // Get current user

  useEffect(() => {
    if (!currentUser || !recipientId) return;

    const chatId = [currentUser.uid, recipientId].sort().join('_');
    const chatRef = collection(db, 'chats', chatId, 'messages');
    const q = query(chatRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          sender: data.sender === currentUser.uid ? 'me' : 'other', // Cast 'sender' as 'me' or 'other'
        } as Message; // Ensure correct typing here
      });
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, [currentUser, recipientId]);

  const sendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    try {
      const chatId = [currentUser.uid, recipientId].sort().join('_'); // Create a chat ID
      const chatRef = collection(db, 'chats', chatId, 'messages');
      
      await addDoc(chatRef, {
        text: message,
        sender: currentUser.uid,
        recipient: recipientId,
        createdAt: new Date(),
      });

      setMessage(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return { message, setMessage, messages, sendMessage };
};
