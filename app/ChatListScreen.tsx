import React from 'react';
import { ScrollView, View } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import BottomNavBar from '../components/BottomNavBar'; 
import styles from '../styles/ChatListScreenStyles'; 

const chatData = [
  { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/50', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/50', lastMessage: 'Catch you later!' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://via.placeholder.com/50', lastMessage: 'See you soon!' },
];

const ChatListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {chatData.map((chat) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            avatar={chat.avatar}
            lastMessage={chat.lastMessage}
          />
        ))}
      </ScrollView>

      {/* Add the BottomNavBar at the bottom */}
      <BottomNavBar />
    </View>
  );
};

export default ChatListScreen;
