import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './themes';

const screenWidth = Dimensions.get('window').width;
const navBarWidth = screenWidth * 0.6; // Set the width to 60% of the screen

export const bottomNavBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: navBarWidth,
    height: 60,
    backgroundColor: colors.accent, // Dark background
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: (screenWidth - navBarWidth) / 2, // Center the bar horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Elevation for Android shadow
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  activeBackground: {
    width: 50,
    height: 50,
    backgroundColor: colors.background, // Green accent for the active state
    borderRadius: 10,
    position: 'absolute',
    top: 5,
  },
  label: {
    fontSize: 12,
    color: colors.paragraph, // Use paragraph color for labels
    fontWeight: '600',
    marginTop: 4,
  },
});
