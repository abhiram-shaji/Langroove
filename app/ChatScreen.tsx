import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useChat } from '../hooks/useChat';
import useUserInfo from '../hooks/useUserInfo';
import { useFlags } from '../hooks/useFlags';
import { setChatLanguage as updateChatLanguage, ensureChatLanguage } from '../hooks/translationService';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import SetTranslateModal from '../components/SetTranslateModal';
import { styles } from '../styles/ChatScreenStyles';
import { RootStackParamList } from '../app/App';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const { chatId } = route.params;
  const { message, setMessage, messages, sendMessage, avatars } = useChat(chatId);
  const { getFlagUrl } = useFlags();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [userLanguage, setUserLanguage] = useState<string | null>(null);
  const [recipientLanguage, setRecipientLanguage] = useState<string | null>(null);

  const currentUser = auth.currentUser;
  const getRecipientId = (chatId: string) => chatId.split('_').find(id => id !== currentUser?.uid);

  const recipientId = getRecipientId(chatId);
  const { userInfo, loading } = useUserInfo(recipientId || '');

  // Load initial language settings for the chat
  useEffect(() => {
    if (currentUser && recipientId) {
      const loadChatLanguages = async () => {
        const { userLanguage, recipientLanguage } = await ensureChatLanguage(chatId, currentUser.uid, recipientId);
        setUserLanguage(userLanguage);
        setRecipientLanguage(recipientLanguage);
        setIsLanguageLoaded(true);
      };
      loadChatLanguages();
    } else {
      console.warn("User not authenticated or recipient ID missing.");
    }
  }, [chatId, currentUser, recipientId]);

  useEffect(() => {
    if (!loading && userInfo) {
      setupNavigationOptions(userInfo);
    }
  }, [userInfo, loading, navigation, userLanguage]);

  const setupNavigationOptions = (userInfo: any) => {
    navigation.setOptions({
      headerTitle: () => renderHeaderTitle(userInfo),
      headerRight: () => renderHeaderRight(),
      headerLeft: () => renderHeaderLeft(),
    });
  };

  const renderHeaderTitle = (userInfo: any) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: userInfo.avatar }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userInfo.name}</Text>
    </View>
  );

  const renderHeaderRight = () => {
    const flagUrl = getFlagUrl(userLanguage);
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: flagUrl }}
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 8 }}>
          <Text style={{ color: 'blue', fontSize: 16 }}>Translator</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );

  const handleSaveLanguage = async (language: string) => {
    if (currentUser) {
      await updateChatLanguage(chatId, currentUser.uid, language);
      setUserLanguage(language);
    } else {
      console.warn("Cannot set language: User not authenticated.");
    }
  };

  // Show loading spinner until userLanguage is available
  if (!isLanguageLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading translation settings...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

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
              isGroupChat={false}
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
