import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.background,
    alignItems: 'center', 
  },
  container: {
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center', 
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center', 
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
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  button: {
    width: '45%',
    marginHorizontal: 10,
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
    alignItems: 'flex-start', // Align to the left for a horizontal row
    paddingHorizontal: 20,
  },
  languagesLabel: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'left',
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  languageText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 5,
  },
  flagIcon: {
    width: 24,
    height: 16,
  },
  languagePlaceholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10, // Adjusts spacing for consistency
  },
});
