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
      console.warn("User is not authenticated.");
      return;
    }

    console.log(`Fetching chats for user: ${currentUser.uid}`);

    const fetchAvatarForUser = async (userId: string) => {
      try {
        if (!userId) {
          console.warn("No user ID provided. Cannot fetch avatar.");
          return "https://via.placeholder.com/50"; // Return placeholder if no user ID
        }
    
        console.log(`Fetching avatar for user ID: ${userId}`);
    
        // Fetch the user document from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
    
        if (!userDoc.exists()) {
          console.warn(`User document for ID: ${userId} not found.`);
          return "https://via.placeholder.com/50"; // Return placeholder if user not found
        }
    
        const userData = userDoc.data();
        
        if (!userData) {
          console.warn(`No data found for user ID: ${userId}.`);
          return "https://via.placeholder.com/50"; // Return placeholder if no data
        }
    
        const avatar = userData.avatar;
        
        if (!avatar) {
          console.warn(`No avatar found for user ID: ${userId}. Using placeholder avatar.`);
          return "https://via.placeholder.com/50"; // Return placeholder if no avatar
        }
    
        console.log(`Fetched avatar for user ID: ${userId} -> ${avatar}`);
        return avatar; // Return the fetched avatar URL
      } catch (error) {
        console.error(`Error fetching avatar for user ID: ${userId}`, error);
        return "https://via.placeholder.com/50"; // Fallback to placeholder if error occurs
      }
    };
    

    const fetchChatAvatars = async (participants: string[]) => {
      if (!currentUser || !currentUser.uid) {
        console.warn("No authenticated user. Cannot fetch avatars.");
        return "https://via.placeholder.com/50"; // Return placeholder if no authenticated user
      }
    
      console.log(`Current user ID: ${currentUser.uid}`);
      console.log(`Participants in chat: ${participants}`);
    
      // Find the other participant (the one that is not the current user)
      const otherParticipantId = participants.find(id => {
        console.log(`Comparing participant ID: ${id} with current user ID: ${currentUser.uid}`);
        return id !== currentUser.uid;
      });
    
      if (!otherParticipantId) {
        console.warn("No other participant found in this one-on-one chat. Using placeholder avatar.");
        return "https://via.placeholder.com/50"; // Fallback if no other participant
      }
    
      console.log(`Other participant ID: ${otherParticipantId}`);
    
      // Fetch the avatar for the other participant
      const avatar = await fetchAvatarForUser(otherParticipantId);
      
      if (avatar) {
        console.log(`Fetched avatar for other participant ${otherParticipantId}: ${avatar}`);
      } else {
        console.warn(`No avatar found for other participant ${otherParticipantId}, using placeholder.`);
      }
    
      return avatar;
    };
    
    
    

    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        console.log(`Received ${snapshot.size} chats from Firestore.`);

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
