// components/ChatListItem.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ChatListItemStyles as styles } from '../styles/ChatListItemStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App'; // Import the navigation types

// Define the props expected by this component
interface ChatListItemProps {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

// Define the navigation prop type
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ChatListItem: React.FC<ChatListItemProps> = ({ id, name, avatar, lastMessage }) => {
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const handleChatPress = () => {
    // Navigate to the ChatScreen with the selected chat ID
    navigation.navigate('Chat', { chatId: id });
  };

  return (
    <TouchableOpacity onPress={handleChatPress}>
      <View style={styles.itemContainer}>
        <Image 
          source={{ uri: avatar || 'https://via.placeholder.com/50' }} 
          style={styles.avatar} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={styles.lastMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
