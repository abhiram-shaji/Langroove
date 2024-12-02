import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background, // Use theme's background color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.headline, // Headline color for the title
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.border, // Border color from theme
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: colors.form, // Consistent background color for inputs
    color: colors.headline, // Input text color for visibility
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.accent, // Accent color for the button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: colors.headline, // Headline color for button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: colors.accent, // Accent color for the "Forgot Password" text
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 20,
  },
  errorText: {
    color: colors.accent, // Retain red for error messages
    marginBottom: 10,
    fontSize: 12,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '25%', // Align icon vertically with input text
  },
});
