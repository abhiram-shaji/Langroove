// /components/ChatInput.tsx

import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { styles } from '../styles/ChatScreenStyles';

type ChatInputProps = {
  message: string;
  onChangeMessage: (text: string) => void;
  onSendMessage: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ message, onChangeMessage, onSendMessage }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Type a message"
        value={message}
        onChangeText={onChangeMessage}
        style={styles.input}
      />
      <Button mode="contained" onPress={onSendMessage} style={styles.sendButton}>
        Send
      </Button>
    </View>
  );
};

export default ChatInput;
