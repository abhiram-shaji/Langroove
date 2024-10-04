// /hooks/useChatList.ts

import { useState } from 'react';

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
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Hey, how are you?',
      timestamp: '2:15 PM',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      lastMessage: "Let's learn Spanish?",
      timestamp: '1:05 PM',
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastMessage: 'How do you say hello in French?',
      timestamp: '11:30 AM',
      unreadCount: 5,
    },
  ]);

  // Filter chats based on the search input
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredChats };
};
