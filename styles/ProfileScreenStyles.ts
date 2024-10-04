// /styles/ProfileScreenStyles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginTop: 30,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  bio: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
});
