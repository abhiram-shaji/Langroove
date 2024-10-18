import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  chatItemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center',
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30', // Red color for unread count
    marginTop: 5,
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
});
