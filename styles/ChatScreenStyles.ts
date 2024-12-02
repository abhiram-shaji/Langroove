import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: colors.secondary, // Consistent background
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border, // Border color from theme
    backgroundColor: colors.background, // Consistent background
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.form, // Consistent input background
    color: colors.headline, // Use theme's headline color for input text
  },
  sendButton: {
    alignSelf: 'center',
    color: colors.accent,
    backgroundColor: colors.buttonBackground, // Accent color for the send button
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    backgroundColor: colors.accent, // Accent color for sent message bubble
    color: colors.headline, // Ensure text in sent messages is readable
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    backgroundColor: colors.secondary, // Consistent background for received message
    color: colors.paragraph, // Use paragraph color for text
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  translationContainer: {
    backgroundColor: colors.accent, // Accent color for translation bubble
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: 'flex-start', // Align with incoming messages
    maxWidth: '80%', // Prevent overly wide translations
  },
  translationText: {
    color: colors.headline, // Headline color for translation text
    fontSize: 14,
    fontStyle: 'italic', // Italicized to differentiate from regular messages
  },
  clearTranslationButton: {
    fontSize: 14,
    color: colors.accent, // Accent color for the button text
    marginTop: 4,
    textAlign: 'right',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  translatorButton: {
    backgroundColor: colors.background, // Accent color for the button
    paddingHorizontal: 10, // Horizontal padding for spacing
    paddingVertical: 6, // Vertical padding
    marginRight: 10, // Right margin for spacing
    borderRadius: 10, // Rounded corners
    flexDirection: 'row', // Aligns flag and text horizontally
    alignItems: 'center', // Vertically centers the items
  },
  flagImage: {
    width: 24,
    height: 24,
    marginRight: 8, // Space between flag and text
  },
  translatorText: {
    color: colors.headline, // White text color from the theme
    fontSize: 16, // Font size
  },
});
