import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    marginBottom: 10,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: '#007bff', // Consider adding this as an accent color in your theme
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.text, // Ensure the text color follows the theme
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.text, // Use theme text color
  },

  buttonContainer: {
    marginTop: 40, // Space between the info and buttons
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute buttons evenly
    paddingHorizontal: 20,
  },
  button: {
    width: '45%', // 45% of width for each button to fit side by side
  },

  bio: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  languagesContainer: {
    width: '100%',
    marginTop: 10,
  },
  languagesLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  languagePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
});
