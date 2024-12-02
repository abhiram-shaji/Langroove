import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use theme's background color
  },
  searchInput: {
    backgroundColor: colors.form, // Accent color for input background
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    color: colors.headline, // Input text color for readability
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Using border color from theme
    paddingEnd: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginLeft: 8,
    backgroundColor: colors.buttonBackground, // Use accent color for placeholder avatar background
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.headline, // Headline color for names
  },
});
