import { StyleSheet } from 'react-native';
import { colors } from './themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dark background color from theme
    paddingTop: 16,
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noChatsText: {
    fontSize: 16,
    color: colors.paragraph, // Use paragraph color for subtle text
  },
  searchInput: {
    backgroundColor: colors.form, // Use the accent color for input background
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    color: colors.headline, // Text color matches headline for visibility
  },
});

export default styles;
