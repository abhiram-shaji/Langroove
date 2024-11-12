import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const bottomNavBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,  // Add padding for spacing on the left and right
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,  // Add vertical padding for a balanced look
  },
  label: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',  // Slightly bold for better readability
    marginTop: 4,
  },
});
