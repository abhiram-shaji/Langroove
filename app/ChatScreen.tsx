import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { useChat } from "../hooks/useChat";
import useUserInfo from "../hooks/useUserInfo";
import { useFlags } from "../hooks/useFlags";
import {
  setChatLanguage,
  ensureChatLanguage,
  translateText,
} from "../hooks/translationService";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import SetTranslateModal from "../components/SetTranslateModal";
import { styles } from "../styles/ChatScreenStyles";
import { RootStackParamList } from "../app/App";

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderType: "me" | "other";
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

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
  const [translatedMessages, setTranslatedMessages] = useState<{ [id: string]: string }>({});
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [translationsCache, setTranslationsCache] = useState<{ [key: string]: string }>({});
  const [cachedMessages, setCachedMessages] = useState<Message[]>([]);

  const currentUser = auth.currentUser;
  const recipientId = chatId.split("_").find((id) => id !== currentUser?.uid) || "";
  const { userInfo, loading } = useUserInfo(recipientId);

  useEffect(() => {
    const loadCache = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
        const storedTranslations = await AsyncStorage.getItem(`translations_${chatId}`);
        if (storedMessages) {
          const parsedMessages: Message[] = JSON.parse(storedMessages);
          setCachedMessages(parsedMessages);
        }
        if (storedTranslations) {
          const parsedTranslations: { [key: string]: string } = JSON.parse(storedTranslations);
          setTranslationsCache(parsedTranslations);
        }
      } catch (error) {
        console.error("Error loading cache:", error);
      }
    };
    loadCache();
  }, [chatId]);

  useEffect(() => {
    const loadChatLanguages = async () => {
      if (currentUser && recipientId) {
        try {
          const { userLanguage, recipientLanguage } = await ensureChatLanguage(
            chatId,
            currentUser.uid,
            recipientId
          );
          setUserLanguage(userLanguage);
          setRecipientLanguage(recipientLanguage);
          setIsLanguageLoaded(true);
        } catch (error) {
          console.error("Error ensuring chat language:", error);
        }
      } else {
        console.warn("User not authenticated or recipient ID missing.");
      }
    };
    loadChatLanguages();
  }, [chatId, currentUser, recipientId]);

  useEffect(() => {
    const cacheMessages = async () => {
      try {
        if (messages.length > 0) {
          await AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
          setCachedMessages(messages);
        }
      } catch (error) {
        console.error("Error caching messages:", error);
      }
    };
    cacheMessages();
  }, [messages, chatId]);

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
    const flagUrl = userLanguage ? getFlagUrl(userLanguage) : null;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {flagUrl && (
          <Image
            source={{ uri: flagUrl }}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
        )}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ padding: 8 }}
        >
          <Text style={{ color: "blue", fontSize: 16 }}>Translator</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 8 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );

  const handleSaveLanguage = async (language: string) => {
    if (currentUser) {
      try {
        await setChatLanguage(chatId, currentUser.uid, language);
        setUserLanguage(language);
      } catch (error) {
        console.error("Error setting chat language:", error);
      }
    } else {
      console.warn("Cannot set language: User not authenticated.");
    }
  };

  const handleDoubleClickMessage = async (messageId: string, messageText: string) => {
    if (!userLanguage) {
      console.warn("User language not set.");
      return;
    }

    if (translationsCache[messageId]) {
      setTranslatedMessages((prev) => ({ ...prev, [messageId]: translationsCache[messageId] }));
    } else {
      try {
        const translatedText = await translateText(messageText, userLanguage);
        setTranslatedMessages((prev) => ({ ...prev, [messageId]: translatedText }));
        
        const updatedTranslationsCache = { ...translationsCache, [messageId]: translatedText };
        setTranslationsCache(updatedTranslationsCache);
        await AsyncStorage.setItem(`translations_${chatId}`, JSON.stringify(updatedTranslationsCache));
      } catch (error) {
        console.error("Error translating message:", error);
      }
    }
  };

  const handleClearTranslation = async (messageId: string) => {
    // Remove from translatedMessages state
    setTranslatedMessages((prev) => {
      const updated = { ...prev };
      delete updated[messageId];
      return updated;
    });

    // Remove from translationsCache and update AsyncStorage
    const updatedTranslationsCache = { ...translationsCache };
    delete updatedTranslationsCache[messageId];
    setTranslationsCache(updatedTranslationsCache);

    try {
      await AsyncStorage.setItem(`translations_${chatId}`, JSON.stringify(updatedTranslationsCache));
    } catch (error) {
      console.error("Error updating cache in AsyncStorage:", error);
    }
  };

  const handleTapMessage = (messageId: string, messageText: string) => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      handleDoubleClickMessage(messageId, messageText);
    } else {
      setLastTap(now);
    }
  };

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
          data={cachedMessages.length > 0 ? cachedMessages : messages}
          renderItem={({ item }) => (
            <View key={item.id}>
              {translatedMessages[item.id] && (
                <View style={styles.translationContainer}>
                  <Text style={styles.translationText}>
                    {translatedMessages[item.id]}
                  </Text>
                  <TouchableOpacity onPress={() => handleClearTranslation(item.id)}>
                    <Text style={styles.clearTranslationButton}>Clear</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => handleTapMessage(item.id, item.text)}
              >
                <ChatMessage
                  text={item.text}
                  senderId={item.senderId}
                  senderType={item.senderType}
                  avatarUri={avatars[item.senderId]}
                  isGroupChat={false}
                  onDoubleTapTranslate={() =>
                    handleDoubleClickMessage(item.id, item.text)
                  }
                />
              </TouchableOpacity>
            </View>
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
