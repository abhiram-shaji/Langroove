import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background, // Consistent background color
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headline, // Headline color for the title
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.paragraph, // Paragraph color for the message
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 15,
  },
  spinner: {
    marginVertical: 20,
  },
  retryMessage: {
    fontSize: 14,
    color: colors.paragraph, // Use disabled color for retry message
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 8,
  },
});
