import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dark background color from theme
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headline, // Use headline color for the title
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: colors.paragraph, // Use paragraph color for instructions
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.border, // Use border color for the input outline
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.headline, // Input text color for visibility
    backgroundColor: colors.background, // Keep consistent background for input
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.buttonBackground, // Accent color for the button background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: colors.headline, // Use headline color for button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLogin: {
    marginTop: 20,
  },
  backToLoginText: {
    color: colors.accent, // Accent color for "Back to Login" link
    fontSize: 16,
  },
});
