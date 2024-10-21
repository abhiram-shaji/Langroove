import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddTopic } from '../hooks/useAddTopic';
import styles from '../styles/AddTopicScreenStyles'; // Import styles from the new file

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
      <Button title="Submit" onPress={() => handleAddTopic(navigation)} />
    </View>
  );
};

export default AddTopicScreen;
