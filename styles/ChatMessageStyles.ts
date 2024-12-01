import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
  },
  receivedMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageWrapper: {
    maxWidth: '80%',
  },
  receivedMessageWrapper: {
    alignItems: 'flex-start', // Aligns the message to the left in received messages
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.accent, // Using theme's accent color for the sender's name
    marginBottom: 3, // Adds some spacing between the name and the message
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
  },
  sentMessage: {
    backgroundColor: colors.accent, // Use accent color for sent message bubbles
    color: colors.headline, // Text inside sent messages uses headline color
  },
  receivedMessage: {
    backgroundColor: colors.background, // Use the background color for received messages
    color: colors.paragraph, // Subtle text for received message content
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.accent, // Placeholder avatar background
  },
});
