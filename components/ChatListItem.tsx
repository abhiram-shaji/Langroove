// components/ChatListItem.tsx

import React from 'react';
import { View, Text, Image } from 'react-native';
import { ChatListItemStyles as styles } from '../styles/ChatListItemStyles';

interface ChatListItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ name, avatar, lastMessage }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </View>
  );
};

export default ChatListItem;
