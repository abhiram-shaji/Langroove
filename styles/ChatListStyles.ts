// /styles/ChatListStyles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    margin: 10,
    borderRadius: 5,
  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  badge: {
    marginTop: 4,
    backgroundColor: '#FF3B30',
  },
  chatList: {
    paddingBottom: 100, // Ensures proper padding at the bottom
  },
});
