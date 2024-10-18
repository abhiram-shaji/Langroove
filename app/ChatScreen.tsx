import React from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App'; // Adjust the path to where RootStackParamList is defined
import { styles } from '../styles/ChatScreenStyles';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { recipientId } = route.params; // Get recipientId from route params
  const { message, setMessage, messages, sendMessage } = useChat(recipientId);

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
