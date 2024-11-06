import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from '../styles/ChatMessageStyles';

type ChatMessageProps = {
  text: string;
  senderId: string;
  senderName?: string;
  senderType: 'me' | 'other';
  avatarUri?: string;
  isGroupChat?: boolean;
  onDoubleTapTranslate?: (text: string) => void;
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

  const handlePress = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      if (isOther) {
        console.log('Accepted: sender is `other`');
        if (onDoubleTapTranslate) {
          console.log("Calling onDoubleTapTranslate...");
          onDoubleTapTranslate(text);
        } else {
          console.log("onDoubleTapTranslate is not defined");
        }
      } else {
        console.log("Rejected: sender is 'me'");
      }
      setLastTap(null); // reset after a double tap is detected
    } else {
      setLastTap(now);
    }
  };

  return (
    <Pressable onPress={handlePress} delayLongPress={DOUBLE_TAP_DELAY}>
      <View style={[styles.messageContainer, isOther ? styles.receivedMessageContainer : styles.sentMessageContainer]}>
        {isOther && avatarUri && (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        )}

        <View style={[styles.messageWrapper, isOther && styles.receivedMessageWrapper]}>
          {isOther && isGroupChat && senderName && (
            <Text style={styles.senderName}>{senderName}</Text>
          )}
          <View style={[styles.message, isOther ? styles.receivedMessage : styles.sentMessage]}>
            <Text>{text}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatMessage;
