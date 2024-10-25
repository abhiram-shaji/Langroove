import { StyleSheet } from 'react-native';
import { colors } from './themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noChatsText: {
    fontSize: 16,
    color: '#888', 
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

export default styles;
