import { StyleSheet } from 'react-native';
import { colors } from './themes';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background, // Use theme's background color
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: colors.accent, // Use accent color for the close button
    borderRadius: 25,
  },
  modalHint: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.accent, // Use accent color for hints or warnings
  },
  modalTitle: {
    paddingTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.headline, // Use headline color for modal title
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.accent, // Use accent color for language items
    borderRadius: 5,
    width: 200,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  languageText: {
    fontSize: 16,
    color: colors.headline, // Use headline color for text inside language items
  },
});

export default styles;
