import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import SetTranslateModal from '../components/SetTranslateModal'; // Import the modal
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

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
        headerRight: () => (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 8 }}>
            <Text style={{ color: 'blue', fontSize: 16 }}>Set Translate</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [userInfo, loading, navigation]);

  const handleSaveLanguage = (language: string) => {
    setSelectedLanguage(language);
    // Here, you can add code to apply the selected language
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <SetTranslateModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveLanguage}
        />
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
