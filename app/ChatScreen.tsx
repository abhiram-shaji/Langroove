// /screens/ChatScreen.tsx

import React from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import { styles } from '../styles/ChatScreenStyles';

const ChatScreen: React.FC = () => {
  const { message, setMessage, messages, sendMessage } = useChat();

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <ChatMessage text={item.text} sender={item.sender} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatArea}
        />

        {/* Chat input area */}
        <ChatInput
          message={message}
          onChangeMessage={setMessage}
          onSendMessage={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default ChatScreen;
