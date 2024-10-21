import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
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
      console.warn("User is not authenticated.");
      return;
    }

    console.log(`Fetching chats for user: ${currentUser.uid}`);

    try {
      // Fetch chats where the current user is a participant
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(`Received ${snapshot.size} chats from Firestore.`);

        const fetchedChats = snapshot.docs.map((doc) => {
          const data = doc.data();
          const lastMessage = data.lastMessage?.text || "No messages yet";

          console.log(`Processing chat: ${doc.id}, participants: ${data.participants}`);

          return {
            id: doc.id, // Chat ID from Firestore
            name: "Chat with " + (data.participants?.join(", ") || "Unknown"), // Placeholder name, replace with actual names
            avatar: "https://via.placeholder.com/50", // Placeholder avatar
            lastMessage: lastMessage,
          };
        });

        setChats(fetchedChats);
      }, (error) => {
        console.error("Error fetching chat snapshots: ", error);
      });

      return () => {
        console.log("Unsubscribing from Firestore listener.");
        unsubscribe(); // Cleanup listener on unmount
      };
    } catch (error) {
      console.error("Error in useEffect while fetching chats: ", error);
    }
  }, []);

  return chats;
};
