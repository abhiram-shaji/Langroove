// /components/ChatItem.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { List, Badge, Divider } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { styles } from '../styles/ChatListStyles';

type ChatItemProps = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  onPress: () => void;
};

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount,
  onPress,
}) => (
  <>
    <List.Item
      title={() => <Text>{name}</Text>}
      description={() => <Text>{lastMessage}</Text>}
      left={() => (
        <Avatar
          rounded
          size="medium"
          source={{ uri: avatarUrl }}
          containerStyle={styles.avatar}
        />
      )}
      right={() => (
        <View style={styles.rightContainer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
          {unreadCount > 0 && (
            <Badge size={22} style={styles.badge}>
              {unreadCount}
            </Badge>
          )}
        </View>
      )}
      onPress={onPress}
    />
    <Divider />
  </>
);

export default ChatItem;
