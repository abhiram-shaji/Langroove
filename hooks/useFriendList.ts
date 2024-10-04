// /hooks/useFriendList.ts

import { useState } from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

const friendsData: Friend[] = [
  { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Michael Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

export const useFriendList = () => {
  const [search, setSearch] = useState<string>('');

  // Filter the friends list based on the search term
  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredFriends };
};
