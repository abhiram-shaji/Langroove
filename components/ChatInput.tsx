// /components/ChatInput.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { styles as chatStyles } from '../styles/ChatScreenStyles';

type ChatInputProps = {
  message: string;
  onChangeMessage: (text: string) => void;
  onSendMessage: () => void;
};

const MAX_MESSAGE_LENGTH = 200; // Maximum allowed message length
const MAX_LINES = 5; // Maximum number of lines before scrolling

const ChatInput: React.FC<ChatInputProps> = ({ message, onChangeMessage, onSendMessage }) => {
  const handleInputChange = (text: string) => {
    if (text.length <= MAX_MESSAGE_LENGTH) {
      onChangeMessage(text);
    }
  };

  return (
    <View style={chatStyles.inputContainer}>
      <TextInput
        label={`Type a message (${message.length}/${MAX_MESSAGE_LENGTH})`}
        value={message}
        onChangeText={handleInputChange}
        multiline
        style={[chatStyles.input, styles.multilineInput]}
        textAlignVertical="top"
        scrollEnabled
        maxLength={MAX_MESSAGE_LENGTH}
      />
      <Button
        mode="contained"
        onPress={onSendMessage}
        style={chatStyles.sendButton}
        disabled={message.trim().length === 0} // Disable button if message is empty
      >
        Send
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    maxHeight: 120, // Limit height to 5 lines
    minHeight: 40, // Minimum height for a single line
    overflow: 'scroll', // Allow scrolling when maxHeight is reached
  },
});

export default ChatInput;
