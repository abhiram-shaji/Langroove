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
});

export default styles;
