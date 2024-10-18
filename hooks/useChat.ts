import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

export const useChat = (recipientId: string) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = auth.currentUser;

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
          sender: data.sender === currentUser.uid ? 'me' : 'other', // Correctly map the sender type
        };
      }) as Message[]; // Ensure proper type casting here
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, [currentUser, recipientId]);

  const sendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    try {
      const chatId = [currentUser.uid, recipientId].sort().join('_');
      const chatRef = collection(db, 'chats', chatId, 'messages');

      // Add the message to the messages collection
      await addDoc(chatRef, {
        text: message,
        sender: currentUser.uid,
        recipient: recipientId,
        createdAt: new Date(),
      });

      // Ensure the chat metadata document exists and update it
      const chatMetaRef = doc(db, 'chats', chatId);
      await setDoc(chatMetaRef, {
        participants: [currentUser.uid, recipientId],
        lastMessage: { text: message, sender: currentUser.uid },
        lastMessageTimestamp: new Date(),
        unreadCount: 0, // You might adjust this based on your app's logic
      }, { merge: true }); // Merge ensures we don't overwrite existing fields

      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return { message, setMessage, messages, sendMessage };
};
