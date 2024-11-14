import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center', // Center content horizontally
  },
  container: {
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center', // Center content horizontally
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    marginTop: 60,
  },
  avatar: {
    marginBottom: 10,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.text,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.text,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center', // Center the row of buttons
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    width: '45%',
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
    alignItems: 'center', // Center content horizontally
  },
  languagesLabel: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  languagePlaceholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  languageText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    marginVertical: 5,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginBottom: 5,
  },
  languageCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '80%',
    alignSelf: 'center', // Center the card within its container
  },
});
