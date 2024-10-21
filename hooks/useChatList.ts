import { useEffect, useState } from 'react';
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
  
  useEffect(() => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return;
    }

    // Fetch user name from Firestore
    const fetchNameForUser = async (userId: string): Promise<string> => {
      try {
        if (!userId) {
          return "Unknown User"; // Placeholder name
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.exists() ? userDoc.data() : null;

        return userData?.name || "Unknown User"; // Fallback to "Unknown User"
      } catch (error) {
        console.error("Error fetching user name:", error);
        return "Unknown User"; // Fallback name
      }
    };

    // Fetch avatar for a user (same as before)
    const fetchAvatarForUser = async (userId: string): Promise<string> => {
      try {
        if (!userId) {
          return "https://via.placeholder.com/50"; // Return placeholder if no user ID
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.exists() ? userDoc.data() : null;

        return userData?.avatar || "https://via.placeholder.com/50"; // Fallback to placeholder
      } catch (error) {
        console.error("Error fetching user avatar:", error);
        return "https://via.placeholder.com/50"; // Fallback to placeholder
      }
    };

    const fetchChatAvatarsAndNames = async (participants: string[], isGroupChat: boolean): Promise<{ name: string, avatar: string }> => {
      if (!currentUser?.uid) {
        return { name: "Unknown", avatar: "https://via.placeholder.com/50" }; // Placeholder if no authenticated user
      }

      if (isGroupChat) {
        return { name: "Unnamed Group", avatar: "https://via.placeholder.com/50" }; // Placeholder for group chats
      }

      const otherParticipantId = participants.find(id => id !== currentUser.uid);
      if (!otherParticipantId) {
        return { name: "Unknown", avatar: "https://via.placeholder.com/50" }; // Fallback if no other participant
      }

      // Fetch name and avatar for the other participant
      const [name, avatar] = await Promise.all([
        fetchNameForUser(otherParticipantId),
        fetchAvatarForUser(otherParticipantId)
      ]);

      return { name, avatar };
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
            id: doc.id, // Chat ID from Firestore
            name: isGroupChat ? (data.groupName || name) : name, // Use groupName if it's a group, else use fetched name
            avatar: avatar,
            lastMessage: lastMessage,
            isGroupChat: isGroupChat,
          };
        }));

        setChats(fetchedChats);
      });

      return () => {
        unsubscribe(); // Cleanup listener on unmount
      };
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

  return chats;
};
