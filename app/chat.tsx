import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, StyleSheet, Text } from 'react-native'; // Text from react-native
import { Appbar, Card, TextInput, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'Hi there!', sender: 'me' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random().toString(), text: message, sender: 'me' },
      ]);
      setMessage('');
    }
  };

  // Explicitly typing the item in renderItem as Message
  const renderItem = ({ item }: { item: Message }) => (
    <Card style={item.sender === 'me' ? styles.sentMessage : styles.receivedMessage}>
      <Card.Content>
        {/* Make sure all text is inside <Text> component */}
        <Text>{item.text}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatArea}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Type a message"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
            Send
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    padding: 10,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    alignSelf: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    backgroundColor: '#E1FFC7',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
  },
});

export default ChatScreen;
