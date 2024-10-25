// hooks/useFriendList.ts
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
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

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const fetchFriends = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const friendsIds = userData?.friends || [];

        const friendsPromises = friendsIds.map(async (friendId: string) => {
          const friendDocRef = doc(db, 'users', friendId);
          const friendDoc = await getDoc(friendDocRef);

          if (friendDoc.exists()) {
            const friendData = friendDoc.data();
            return {
              id: friendId,
              name: friendData?.name || 'Unknown',
              avatar: friendData?.avatar || 'https://robohash.org/default-avatar.png',
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
