// /components/ChatMessage.tsx

import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/ChatMessageStyles';

type ChatMessageProps = {
  text: string;
  senderId: string;
  senderName?: string;      // Optional: Display sender's name (for group chats)
  senderType: 'me' | 'other';
  avatarUri?: string;       // Optional: Display avatar (for group or one-on-one chats)
  isGroupChat?: boolean;    // Optional: Determines if it's a group chat
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  senderId,
  senderName,
  senderType,
  avatarUri,
  isGroupChat = false,
}) => {
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

      <View style={[styles.messageWrapper, isOther && styles.receivedMessageWrapper]}>
        
        {isOther && isGroupChat && senderName && (
          <Text style={styles.senderName}>{senderName}</Text>
        )}

        <View style={[styles.message, isOther ? styles.receivedMessage : styles.sentMessage]}>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatMessage;
