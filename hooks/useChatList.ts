import { useEffect, useState, useRef } from 'react';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Firestore and auth instance

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isGroupChat: boolean;
};

export const useChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  
  // In-memory cache for user data
  const userCache = useRef<{ [userId: string]: { name: string; avatar: string } }>({});

  useEffect(() => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return;
    }

    // Fetch user data (name and avatar) with caching
    const fetchUserData = async (userId: string): Promise<{ name: string; avatar: string }> => {
      // Check if the user data is already in the cache
      if (userCache.current[userId]) {
        return userCache.current[userId];
      }

      try {
        if (!userId) {
          return { name: "Unknown User", avatar: "https://via.placeholder.com/50" };
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.exists() ? userDoc.data() : null;

        const name = userData?.name || "Unknown User";
        const avatar = userData?.avatar || "https://via.placeholder.com/50";

        // Store fetched data in the cache
        userCache.current[userId] = { name, avatar };

        return { name, avatar };
      } catch (error) {
        console.error("Error fetching user data:", error);
        return { name: "Unknown User", avatar: "https://via.placeholder.com/50" };
      }
    };

    const fetchChatAvatarsAndNames = async (participants: string[], isGroupChat: boolean): Promise<{ name: string, avatar: string }> => {
      if (!currentUser?.uid) {
        return { name: "Unknown", avatar: "https://via.placeholder.com/50" };
      }

      if (isGroupChat) {
        return { name: "Unnamed Group", avatar: "https://via.placeholder.com/50" };
      }

      const otherParticipantId = participants.find(id => id !== currentUser.uid);
      if (!otherParticipantId) {
        return { name: "Unknown", avatar: "https://via.placeholder.com/50" };
      }

      // Fetch user data for the other participant with caching
      return await fetchUserData(otherParticipantId);
    };

    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const fetchedChats = await Promise.all(snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const isGroupChat = data.isGroupChat || false;
          const lastMessage = data.lastMessage?.text || "No messages yet";

          // Fetch the chat name and avatar
          const { name, avatar } = await fetchChatAvatarsAndNames(data.participants, isGroupChat);

          return {
            id: doc.id,
            name: isGroupChat ? (data.groupName || name) : name,
            avatar: avatar,
            lastMessage: lastMessage,
            isGroupChat: isGroupChat,
          };
        }));

        setChats(fetchedChats);
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

  return chats;
};
