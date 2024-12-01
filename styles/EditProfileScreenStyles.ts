import { StyleSheet } from 'react-native';
import { colors } from './themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dark background color from theme
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headline, // Use headline color for prominent text
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.paragraph, // Subtle paragraph color for labels
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border, // Border color from theme
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.background, // Matches overall dark background
    color: colors.headline, // Input text color for visibility
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bioSection: {
    marginBottom: 20,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border, // Border color for bio input
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.background, // Matches screen background
    color: colors.headline, // Text color for bio input
  },
  charCount: {
    textAlign: 'right',
    color: colors.accent, // Accent color for character count
    fontSize: 12,
  },
  languageSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  removeText: {
    color: colors.accent, // Accent color for remove text
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.accent, // Accent color for save button
    color: colors.headline, // White text on button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});
