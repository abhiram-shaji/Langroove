import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import SetTranslateModal from '../components/SetTranslateModal';
import { useChat } from '../hooks/useChat';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import useUserInfo from '../hooks/useUserInfo';
import { useFlags } from '../hooks/useFlags';
import { styles } from '../styles/ChatScreenStyles';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const { chatId } = route.params;
  const { message, setMessage, messages, sendMessage, avatars, userLanguage, setChatLanguage } = useChat(chatId); // Ensure setChatLanguage is included here
  const { getFlagUrl } = useFlags(); // Use the useFlags hook
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: getFlagUrl(userLanguage) }} // Get the flag URL based on the user's language
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 8 }}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Translator</Text>
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [userInfo, loading, navigation, userLanguage]);

  const handleSaveLanguage = (language: string) => {
    setChatLanguage(language); // Save the language to Firestore
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
