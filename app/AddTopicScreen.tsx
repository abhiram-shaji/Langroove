import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddTopic } from '../hooks/useAddTopic';
import styles from '../styles/AddTopicScreenStyles';

const MAX_DESCRIPTION_LENGTH = 200; // Define your maximum length here

const AddTopicScreen: React.FC = () => {
  const navigation = useNavigation();
  const { description, setDescription, handleAddTopic } = useAddTopic();
  
  // Optional: Local state to manage remaining characters
  const [remaining, setRemaining] = useState(MAX_DESCRIPTION_LENGTH - description.length);

  const handleChangeText = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(text);
      setRemaining(MAX_DESCRIPTION_LENGTH - text.length);
    }
    // Optionally, you can provide feedback if the user tries to exceed the limit
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={handleChangeText}
        style={[styles.input, styles.textArea]}
        multiline
        maxLength={MAX_DESCRIPTION_LENGTH} // Enforce maximum length
      />
      <Text style={styles.charCount}>{remaining} characters remaining</Text> {/* Display remaining characters */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={() => handleAddTopic(navigation)}
        disabled={description.length === 0} // Optionally disable the button if input is empty
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Optional: Define or update styles to accommodate the character count
const additionalStyles = StyleSheet.create({
  charCount: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    color: 'gray',
    fontSize: 12,
  },
});

export default AddTopicScreen;
