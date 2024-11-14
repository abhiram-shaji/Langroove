import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const ChatListItemStyles = StyleSheet.create({
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
    marginLeft: 8,
    backgroundColor: 'purple',
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
