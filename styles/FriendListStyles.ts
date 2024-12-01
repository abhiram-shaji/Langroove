import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use theme's background color
  },
  searchInput: {
    backgroundColor: colors.accent, // Accent color for input background
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    color: colors.headline, // Input text color for readability
  },
});
