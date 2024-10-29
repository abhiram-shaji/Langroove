import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useChat } from '../hooks/useChat';
import useUserInfo from '../hooks/useUserInfo';
import { useFlags } from '../hooks/useFlags';
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
  const { message, setMessage, messages, sendMessage, avatars, userLanguage, setChatLanguage } = useChat(chatId);
  const { getFlagUrl } = useFlags();
  const [isModalVisible, setModalVisible] = useState(false);
  
  // Moved the function here
  const getRecipientId = (chatId: string) => {
    return chatId.split('_').find(id => id !== auth.currentUser?.uid);
  };

  const recipientId = getRecipientId(chatId);
  const { userInfo, loading } = useUserInfo(recipientId || '');

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

  const renderHeaderRight = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: getFlagUrl(userLanguage) }}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 8 }}>
        <Text style={{ color: 'blue', fontSize: 16 }}>Translator</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );

  const handleSaveLanguage = (language: string) => {
    setChatLanguage(language);
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
