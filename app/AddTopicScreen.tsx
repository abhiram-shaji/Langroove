import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'; // Import your Firebase config
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore methods

const AddTopicScreen: React.FC = () => {
  const [description, setDescription] = useState<string>(''); // No title, only description
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!description) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to add a topic');
      return;
    }

    const newTopic = {
      description, // Only description now
      ownerId: currentUser.uid,
      ownerName: currentUser.displayName || 'Anonymous',
      createdAt: serverTimestamp(), // Use Firestore's server timestamp
    };

    try {
      // Save the topic to Firestore (generating a unique ID)
      const topicDocRef = doc(db, 'topics', `${currentUser.uid}-${Date.now()}`);
      await setDoc(topicDocRef, newTopic);

      Alert.alert('Success', 'Topic added successfully');
      navigation.goBack(); // Navigate back to the FeedScreen
    } catch (error) {
      console.error('Error saving topic:', error);
      Alert.alert('Error', 'Failed to save topic. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddTopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Ensure consistent styling with your theme
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8, // Rounded corners for modern design
  },
  textArea: {
    height: 100,
  },
});
