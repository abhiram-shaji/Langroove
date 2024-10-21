import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../styles/themes';

interface ChatListItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ name, avatar, lastMessage }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 4,
  },
});

export default ChatListItem;
