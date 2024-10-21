import React from 'react';
import { ScrollView, View } from 'react-native';
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
