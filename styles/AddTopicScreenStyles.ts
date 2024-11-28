// AddTopicScreenStyles.ts
import { StyleSheet } from 'react-native';
import { colors } from './themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 50,
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensures the text starts at the top in multiline
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200, // Set the width to be the same as the button in FeedScreen
    marginBottom: 16,
  },
  submitButtonText: {
    color: colors.background, // white text on black button
    fontSize: 16,
    fontWeight: 'bold',
  },
  charCount: {
    alignSelf: 'flex-end',    // Aligns the text to the right
    marginRight: 10,          // Adds some right margin for spacing
    marginTop: 5,             // Adds top margin to separate from the TextInput
    color: 'gray',            // Sets the text color to gray for subtlety
    fontSize: 12,             // Sets a smaller font size
  },
});

export default styles;
