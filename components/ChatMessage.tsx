// /components/ChatMessage.tsx

import React from 'react';
import { Card } from 'react-native-paper';
import { Text, View } from 'react-native';
import { styles } from '../styles/ChatScreenStyles';

type ChatMessageProps = {
  text: string;
  sender: 'me' | 'other';
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  return (
    <Card style={sender === 'me' ? styles.sentMessage : styles.receivedMessage}>
      <Card.Content>
        <Text>{text}</Text>
      </Card.Content>
    </Card>
  );
};

export default ChatMessage;
