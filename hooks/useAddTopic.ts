import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore methods

export const useAddTopic = () => {
  const [description, setDescription] = useState<string>('');

  const handleAddTopic = async (navigation: any) => {
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
      createdAt: serverTimestamp(), // Firestore's server timestamp
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

  return {
    description,
    setDescription,
    handleAddTopic,
  };
};
