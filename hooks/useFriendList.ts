import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firebase Firestore
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Import Firebase Auth

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export const useFriendList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState<string>('');
  const currentUser = auth.currentUser; // Get current logged-in user

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const fetchFriends = async () => {
    if (!currentUser) return;

    try {
      // Get the current user's document from Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const friendsIds = userData?.friends || [];

        // Fetch details for each friend
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

        // Wait for all friend data to be fetched
        const friendsData = (await Promise.all(friendsPromises)).filter(Boolean) as Friend[];

        setFriends(friendsData); // Update state with fetched friends
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  // Filter the friends list based on the search term
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredFriends };
};
