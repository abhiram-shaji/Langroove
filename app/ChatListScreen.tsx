import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/ChatListScreenStyles';
import { useChatList } from '../hooks/useChatList'; // Import the custom hook

const ChatListScreen: React.FC = () => {
  const chats = useChatList(); // Use the custom hook to get chats

  return (
    <View style={styles.container}>
      <ScrollView>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              avatar={chat.avatar}
              lastMessage={chat.lastMessage}
            />
          ))
        ) : (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>No chats available</Text>
          </View>
        )}
      </ScrollView>

      {/* Add the BottomNavBar at the bottom */}
      <BottomNavBar />
    </View>
  );
};

export default ChatListScreen;
