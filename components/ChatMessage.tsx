// /components/ChatMessage.tsx

import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/ChatMessageStyles';

type ChatMessageProps = {
  text: string;
  sender: 'me' | 'other';
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  const isOther = sender === 'other';
  const avatarUrl = `https://robohash.org/${sender}`;

  return (
    <View
      style={[
        styles.messageContainer,
        isOther ? styles.receivedMessageContainer : styles.sentMessageContainer,
      ]}
    >
      {isOther && (
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
      )}
      <View style={[styles.message, isOther ? styles.receivedMessage : styles.sentMessage]}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;
