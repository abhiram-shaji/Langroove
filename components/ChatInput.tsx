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

const MAX_MESSAGE_LENGTH = 200; // Set your desired max input length

const ChatInput: React.FC<ChatInputProps> = ({ message, onChangeMessage, onSendMessage }) => {
  const handleInputChange = (text: string) => {
    if (text.length <= MAX_MESSAGE_LENGTH) {
      onChangeMessage(text);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label={`Type a message (${message.length}/${MAX_MESSAGE_LENGTH})`}
        value={message}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={onSendMessage}
        style={styles.sendButton}
        disabled={message.trim().length === 0} // Disable button if message is empty
      >
        Send
      </Button>
    </View>
  );
};

export default ChatInput;
