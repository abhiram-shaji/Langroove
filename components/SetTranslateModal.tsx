// SetTranslateModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface SetTranslateModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedLanguage: string) => void;
}

const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic"];

const SetTranslateModal: React.FC<SetTranslateModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleSave = () => {
    if (selectedLanguage) {
      onSave(selectedLanguage);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select Language</Text>
        <FlatList
          data={languages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedLanguage(item)}
              style={[
                styles.languageItem,
                item === selectedLanguage && styles.selectedLanguageItem,
              ]}
            >
              <Text style={styles.languageText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
  selectedLanguageItem: {
    backgroundColor: '#ddd',
  },
  languageText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SetTranslateModal;
