import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { RootStackParamList } from '../app/App';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export const useProfileActions = (ownerId: string) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser; // Get current logged-in user

  const handleAddFriend = async () => {
    if (!currentUser) return; // Ensure the user is logged in
    setLoading(true);
    try {
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const ownerUserDocRef = doc(db, 'users', ownerId);

      await updateDoc(currentUserDocRef, {
        friends: arrayUnion(ownerId),
      });
      await updateDoc(ownerUserDocRef, {
        friends: arrayUnion(currentUser.uid),
      });

      Alert.alert('Success', 'You are now friends!');
    } catch (error) {
      console.error('Error adding friend:', error);
      Alert.alert('Error', 'There was an error adding this user as a friend.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    console.log('Send Message pressed');
    const currentUserId = currentUser?.uid;
    if (!currentUserId) {
      console.error('User not authenticated');
      return;
    }
    const chatId = [currentUserId, ownerId].sort().join('_');
    navigation.navigate('Chat', { chatId });
  };

  return {
    handleAddFriend,
    handleSendMessage,
    loading,
  };
};
