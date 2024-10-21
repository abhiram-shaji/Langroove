import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Firestore and auth instance

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

export const useChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const fetchAvatarForUser = async (userId: string) => {
      try {
        if (!userId) {
          return "https://via.placeholder.com/50"; // Return placeholder if no user ID
        }

        // Fetch the user document from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));

        if (!userDoc.exists()) {
          return "https://via.placeholder.com/50"; // Return placeholder if user not found
        }

        const userData = userDoc.data();
        
        if (!userData || !userData.avatar) {
          return "https://via.placeholder.com/50"; // Return placeholder if no data or avatar
        }

        return userData.avatar; // Return the fetched avatar URL
      } catch (error) {
        return "https://via.placeholder.com/50"; // Fallback to placeholder if error occurs
      }
    };

    const fetchChatAvatars = async (participants: string[]) => {
      if (!currentUser || !currentUser.uid) {
        return "https://via.placeholder.com/50"; // Return placeholder if no authenticated user
      }

      // Find the other participant (the one that is not the current user)
      const otherParticipantId = participants.find(id => id !== currentUser.uid);

      if (!otherParticipantId) {
        return "https://via.placeholder.com/50"; // Fallback if no other participant
      }

      // Fetch the avatar for the other participant
      return await fetchAvatarForUser(otherParticipantId);
    };

    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const fetchedChats = await Promise.all(snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const lastMessage = data.lastMessage?.text || "No messages yet";

          const avatar = await fetchChatAvatars(data.participants);

          return {
            id: doc.id, // Chat ID from Firestore
            name: "Chat with " + (data.participants?.join(", ") || "Unknown"), // Placeholder name, replace with actual names
            avatar: avatar, // Use fetched avatar
            lastMessage: lastMessage,
          };
        }));

        setChats(fetchedChats);
      });

      return () => {
        unsubscribe(); // Cleanup listener on unmount
      };
    } catch (error) {
      // Error handling here
    }
  }, []);

  return chats;
};
