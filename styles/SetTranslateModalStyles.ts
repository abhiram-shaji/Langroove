// SetTranslateModalStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'black',
  },
  modalTitle: {
    paddingTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'black',
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
    color: 'white',
  },
});

export default styles;
