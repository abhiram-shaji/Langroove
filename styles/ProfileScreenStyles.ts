import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: colors.background,
  },
  container: {
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
    color: '#007bff',
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
    color: colors.text,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
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