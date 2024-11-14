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
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  languagePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  languageText: {
    fontSize: 16,
    color: colors.text,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures text fills the available space
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '80%',
  },  
});
