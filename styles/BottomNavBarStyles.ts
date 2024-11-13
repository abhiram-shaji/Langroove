import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const bottomNavBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    position: 'relative',
  },
  navItem: {
    alignItems: 'center',
    flex: 1, // Adjusts width based on the screen width
  },
  activeBackground: {
    width: 60, // Size of the square
    height: 60,
    backgroundColor: 'black',
    borderRadius: 4,
    position: 'absolute',
    top: 6, // Center it vertically relative to icons
    left: '8.5%', // Slightly offset to align with icon centers
  },
  label: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
  },
});
