import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const ChatListItemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Using border color from theme
    paddingEnd: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginLeft: 8,
    backgroundColor: colors.buttonBackground, // Use accent color for placeholder avatar background
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.headline, // Headline color for names
  },
  lastMessage: {
    fontSize: 14,
    color: colors.paragraph, // Paragraph color for the last message text
    marginTop: 4,
    overflow: 'hidden',
  },
});
