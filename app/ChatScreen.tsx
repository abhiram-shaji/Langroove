import React from 'react';
import { FlatList, KeyboardAvoidingView, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { styles } from '../styles/ChatScreenStyles';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  console.log('Route params:', route.params);
  const { chatId } = route.params;  // Ensure chatId is passed correctly via route params

  // Return early if chatId is invalid or missing
  if (!chatId) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text style={{ color: 'red' }}>Invalid or missing chatId</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  const { message, setMessage, messages, sendMessage, avatars } = useChat(chatId);
  const [isGroupChat, setIsGroupChat] = React.useState(false);  // State to handle if the chat is a group chat

  // UI for empty chat
  if (!messages || messages.length === 0) {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.chatArea}>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No messages yet. Start the conversation!</Text>
          </View>
          <ChatInput
            message={message}
            onChangeMessage={setMessage}
            onSendMessage={sendMessage}
          />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <ChatMessage
              text={item.text}
              senderId={item.senderId}
              senderType={item.senderType}
              avatarUri={avatars[item.senderId]}  // Avatar for each sender
              senderName={isGroupChat ? item.senderId : undefined}  // Show sender's name if group chat
              isGroupChat={isGroupChat}  // Pass group chat status
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatArea}
        />

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
