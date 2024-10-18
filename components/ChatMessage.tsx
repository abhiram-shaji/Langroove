// /components/ChatMessage.tsx

import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/ChatMessageStyles';

type ChatMessageProps = {
  text: string;
  senderId: string;
  senderType: 'me' | 'other';
  avatarUri?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, senderId, senderType, avatarUri }) => {
  const isOther = senderType === 'other';

  return (
    <View
      style={[
        styles.messageContainer,
        isOther ? styles.receivedMessageContainer : styles.sentMessageContainer,
      ]}
    >
      {isOther && avatarUri && (
        <Image
          source={{ uri: avatarUri }}
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
