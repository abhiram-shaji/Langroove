import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Firestore and auth instance
import ChatListItem from '../components/ChatListItem';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/ChatListScreenStyles';

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

const ChatListScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn("User is not authenticated.");
      return;
    }

    // Fetch chats where the current user is a participant
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats = snapshot.docs.map((doc) => {
        const data = doc.data();
        const lastMessage = data.lastMessage?.text || "No messages yet";

        return {
          id: doc.id, // Chat ID from Firestore
          name: "Chat with " + (data.participants?.join(", ") || "Unknown"), // Placeholder name, replace with actual names
          avatar: "https://via.placeholder.com/50", // Placeholder avatar
          lastMessage: lastMessage,
        };
      });

      setChats(fetchedChats);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}              // Pass chat ID for navigation
              name={chat.name}
              avatar={chat.avatar}
              lastMessage={chat.lastMessage}
            />
          ))
        ) : (
          <ChatListItem
            id="0"
            name="No chats yet"
            avatar="https://via.placeholder.com/50"
            lastMessage="Start a conversation!"
          />
        )}
      </ScrollView>

      {/* Add the BottomNavBar at the bottom */}
      <BottomNavBar />
    </View>
  );
};

export default ChatListScreen;
