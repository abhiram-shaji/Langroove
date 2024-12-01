import { StyleSheet } from 'react-native';
import { colors } from './themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 50,
    backgroundColor: colors.background, // Dark background
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border, // Using border color for input field outline
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.background, // Matches the overall dark theme
    color: colors.headline, // Ensures text inside the input is visible
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensures the text starts at the top in multiline
  },
  submitButton: {
    backgroundColor: colors.buttonBackground, // Purple button background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200, // Set consistent button width
    marginBottom: 16,
  },
  submitButtonText: {
    color: colors.buttonText, // White text on button
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSubmitButton: {
    backgroundColor: colors.buttonDisabled, // Purple, same as buttonBackground
    opacity: 0.5, // Reduce opacity for visual feedback
  },
  submitButtonHover: {
    backgroundColor: colors.accent, // Green for hover/focus state
  },
  charCount: {
    alignSelf: 'flex-end', // Aligns the text to the right
    marginRight: 10, // Adds some right margin for spacing
    marginTop: 5, // Adds top margin to separate from the TextInput
    color: colors.paragraph, // Subtle gray for text
    fontSize: 12, // Sets a smaller font size
  },
});

export default styles;
