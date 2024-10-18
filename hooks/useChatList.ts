import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firestore
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { auth } from '../firebase'; // Import Firebase Auth

type Chat = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

export const useChatList = () => {
  const [search, setSearch] = useState<string>(''); // Search state
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUser = auth.currentUser; // Get the current user

  useEffect(() => {
    if (!currentUser) return;

    // Assuming a collection "chats" where we store chat metadata
    const chatsRef = collection(db, 'chats');
    
    // Query to get chats where the current user is a participant
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid), // Fetch chats where current user is a participant
      orderBy('lastMessageTimestamp', 'desc') // Order by the latest message timestamp
    );

    // Listen to real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Unknown User', // Assuming chat has a name field
          avatarUrl: data.avatarUrl || 'https://robohash.org/default-avatar.png', // Default avatar if none exists
          lastMessage: data.lastMessage?.text || '', // Get the latest message text
          timestamp: data.lastMessageTimestamp?.toDate().toLocaleTimeString() || '', // Format the timestamp
          unreadCount: data.unreadCount || 0, // Unread message count
        };
      });
      setChats(fetchedChats);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [currentUser]);

  // Filter chats based on the search input
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredChats };
};
