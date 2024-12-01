import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background, // Consistent background color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.headline, // Headline color for prominent title
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
    color: colors.headline, // Text color for input fields
    backgroundColor: colors.form,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.accent, // Accent color for button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.border, // Subtle color for disabled button
    opacity: 0.5, // Visual feedback for disabled state
  },
  buttonText: {
    color: colors.headline, // Headline color for button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000', // Retain red for error messages
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '20%', // Adjust to vertically center the icon as needed
  },
});
