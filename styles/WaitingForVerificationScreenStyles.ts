// styles/WaitingForVerificationScreenStyles.ts
import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 15,
  },
  spinner: {
    marginVertical: 20,
  },
  retryMessage: {
    fontSize: 14,
    color: colors.disabled,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 8,
  },
});
