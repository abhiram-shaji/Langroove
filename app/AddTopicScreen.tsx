import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddTopic } from '../hooks/useAddTopic';
import styles from '../styles/AddTopicScreenStyles';

const AddTopicScreen: React.FC = () => {
  const navigation = useNavigation();
  const { description, setDescription, handleAddTopic } = useAddTopic();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={() => handleAddTopic(navigation)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTopicScreen;
