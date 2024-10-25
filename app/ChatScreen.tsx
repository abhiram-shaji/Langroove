import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import useUserInfo from '../hooks/useUserInfo';
import { styles } from '../styles/ChatScreenStyles';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const { chatId } = route.params;
  const { message, setMessage, messages, sendMessage, avatars } = useChat(chatId);
  const [isGroupChat, setIsGroupChat] = useState(false);

  const recipientId = chatId.split('_').find(id => id !== auth.currentUser?.uid); 
  const { userInfo, loading } = useUserInfo(recipientId || ''); 

  useEffect(() => {
    if (!loading && userInfo) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: userInfo.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userInfo.name}</Text>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [userInfo, loading, navigation]);

  if (!chatId) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text style={{ color: 'red' }}>Invalid or missing chatId</Text>
        </View>
      </SafeAreaProvider>
    );
  }

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
              avatarUri={avatars[item.senderId]}
              senderName={isGroupChat ? item.senderId : undefined}
              isGroupChat={isGroupChat}
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
