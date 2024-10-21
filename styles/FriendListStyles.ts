// /styles/FriendListStyles.ts

import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchInput: {
    backgroundColor: '#F0F0F0', // This color can be added to the theme if it's used widely, or a similar color from the theme can be used
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text, 
  },
});
