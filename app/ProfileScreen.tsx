import React from 'react';
import { View, Alert } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App';
import { auth, db } from '../firebase'; // Import Firebase Auth and Firestore
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import necessary Firestore functions

// Define navigation prop type
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Define route prop type
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params; // Get ownerId from navigation params
  const currentUser = auth.currentUser; // Get current logged-in user

  const handleAddFriend = async () => {
    if (!currentUser) return; // Ensure the user is logged in
    try {
      // Get references to both users' Firestore documents
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const ownerUserDocRef = doc(db, 'users', ownerId);

      // Update both users' friend lists by adding each other's IDs
      await updateDoc(currentUserDocRef, {
        friends: arrayUnion(ownerId),
      });
      await updateDoc(ownerUserDocRef, {
        friends: arrayUnion(currentUser.uid),
      });

      // Show success alert
      Alert.alert('Success', 'You are now friends!');
    } catch (error) {
      console.error('Error adding friend:', error);
      Alert.alert('Error', 'There was an error adding this user as a friend.');
    }
  };

  const handleSendMessage = () => {
    console.log('Send Message pressed');
  
    const currentUserId = currentUser?.uid;
  
    if (!currentUserId) {
      console.error('User not authenticated');
      return;
    }
  
    // Generate chatId by combining the current user and recipient's IDs
    const chatId = [currentUserId, ownerId].sort().join('_');
  
    // Navigate to the Chat screen with chatId only
    navigation.navigate('Chat', { chatId });
  };
  
  

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />

      {/* Profile Avatar Section */}
      <ProfileAvatar userId={ownerId} />

      {/* User Info Section */}
      <ProfileInfo userId={ownerId} />

      {/* Add Friend and Send Message Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleAddFriend} style={styles.button}>
          Add Friend
        </Button>
        <Button mode="contained" onPress={handleSendMessage} style={styles.button}>
          Message
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
