// /styles/ChatScreenStyles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    padding: 10,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    alignSelf: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    backgroundColor: '#E1FFC7',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
  },
});
