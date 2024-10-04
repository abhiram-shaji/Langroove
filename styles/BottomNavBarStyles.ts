import { StyleSheet } from 'react-native';
import { colors } from './themes';  // Assuming you have a theme file with colors

export const bottomNavBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
});
