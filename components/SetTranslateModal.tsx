// SetTranslateModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SetTranslateModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedLanguage: string) => void;
}

const languages = [
  "English",
  "Spanish",
  "French",
  "Mandarin Chinese",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian"
];

const SetTranslateModal: React.FC<SetTranslateModalProps> = ({ visible, onClose, onSave }) => {
  const handleLanguageSelect = (language: string) => {
    onSave(language);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Select Language</Text>
        <FlatList
          data={languages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleLanguageSelect(item)}
              style={styles.languageItem}
            >
              <Text style={styles.languageText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  languageItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
  },
});

export default SetTranslateModal;
