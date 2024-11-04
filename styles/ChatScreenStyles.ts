// /styles/ChatScreenStyles.ts

import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: colors.background, // Ensure consistent background
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border, // Use theme's border color
    backgroundColor: colors.background, // Keep background consistent
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.background, // Consistent input background
    color: colors.text, // Use the theme's text color
  },
  sendButton: {
    alignSelf: 'center',
    color: colors.primary, // Primary color for the send button if text/button color is applicable
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    backgroundColor: '#E1FFC7', // Could be added to the theme if widely used
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    backgroundColor: colors.background, // Use the theme's background color for received messages
  },
  translationContainer: {
    backgroundColor: '#f0f0f0', // Light gray background for translation bubble
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: 'flex-start', // Aligns it with the incoming message
    maxWidth: '80%', // Limits width to avoid overly wide translations
  },
  translationText: {
    color: '#333', // Dark text for readability
    fontSize: 14,
    fontStyle: 'italic', // Italicized to differentiate from regular message
  },
});
