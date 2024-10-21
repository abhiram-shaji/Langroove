import { StyleSheet } from 'react-native';
import { colors } from '../styles/themes'; // Import colors from themes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background, // Use theme background color
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border, // Use theme border color
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.background, // Ensure consistent input background
    color: colors.text, // Text color from theme
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: colors.border, // Consistent with input
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
    color: colors.text, // Use text color from theme
  },
});

export default styles;
