// hooks/useFriendList.ts
import { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import useSearch from './useSearch';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export const useFriendList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const currentUser = auth.currentUser;
  
  // Use the useSearch hook to manage the search functionality
  const { search, setSearch, filteredData: filteredFriends } = useSearch<Friend>(friends);

  // In-memory cache for user data
  const userCache = useRef<{ [userId: string]: { name: string; avatar: string } }>({});

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  // Fetch user data (name and avatar) with caching
  const fetchUserData = async (userId: string): Promise<{ name: string; avatar: string } | null> => {
    // Check if the user data is already in the cache
    if (userCache.current[userId]) {
      return userCache.current[userId];
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const name = userData?.name || 'Unknown';
        const avatar = userData?.avatar || 'https://robohash.org/default-avatar.png';

        // Store fetched data in the cache
        userCache.current[userId] = { name, avatar };

        return { name, avatar };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }

    return null;
  };

  const fetchFriends = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const friendsIds = userData?.friends || [];

        const friendsPromises = friendsIds.map(async (friendId: string) => {
          // Fetch user data with caching
          const friendData = await fetchUserData(friendId);

          if (friendData) {
            return {
              id: friendId,
              name: friendData.name,
              avatar: friendData.avatar,
            };
          }

          return null;
        });

        const friendsData = (await Promise.all(friendsPromises)).filter(Boolean) as Friend[];
        setFriends(friendsData);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  return { search, setSearch, filteredFriends };
};
