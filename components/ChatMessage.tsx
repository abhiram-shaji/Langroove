import React, { useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { styles } from '../styles/ChatMessageStyles';

type ChatMessageProps = {
  text: string;
  senderId: string;
  senderName?: string;
  senderType: 'me' | 'other';
  avatarUri?: string;
  isGroupChat?: boolean;
  onDoubleTapTranslate?: (text: string) => Promise<void>; // Updated type to return Promise
};

const DOUBLE_TAP_DELAY = 300; // milliseconds for detecting double taps

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  senderId,
  senderName,
  senderType,
  avatarUri,
  isGroupChat = false,
  onDoubleTapTranslate,
}) => {
  const isOther = senderType === 'other';
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  const handlePress = async () => { // Made the function asynchronous
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      if (isOther) {
        if (onDoubleTapTranslate) {
          setIsLoading(true); // Set loading state to true
          try {
            await onDoubleTapTranslate(text); // Await the translation function
          } finally {
            setIsLoading(false); // Reset loading state after translation
          }
        }
      }
      setLastTap(null); // reset after a double tap is detected
    } else {
      setLastTap(now);
    }
  };

  return (
    <Pressable onPress={handlePress} delayLongPress={DOUBLE_TAP_DELAY}>
      <View style={[
        styles.messageContainer,
        isOther ? styles.receivedMessageContainer : styles.sentMessageContainer
      ]}>
        {isOther && avatarUri && (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        )}
        <View style={[
          styles.messageWrapper,
          isOther && styles.receivedMessageWrapper
        ]}>
          {isOther && isGroupChat && senderName && (
            <Text style={styles.senderName}>{senderName}</Text>
          )}
          <View style={[
            styles.message,
            isOther ? styles.receivedMessage : styles.sentMessage
          ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{text}</Text>
              {isLoading && ( // Conditionally render the loading icon
                <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 5 }} />
              )}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatMessage;
