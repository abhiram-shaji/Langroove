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
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBackground: {
    backgroundColor: 'black', // Black background for the active icon only
    borderRadius: 4, // Square with slightly rounded edges
  },
  label: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
  },
});
