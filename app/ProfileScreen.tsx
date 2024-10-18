import React from 'react';
import { View, Alert } from 'react-native';
import { IconButton, Button } from 'react-native-paper'; 
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App'; 
import { auth, db } from '../firebase'; // Import Firebase Auth and Firestore
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// Route type for profile screen navigation
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params; // Get ownerId from navigation params
  const currentUser = auth.currentUser; // Get current logged-in user

  const handleAddFriend = async () => {
    if (!currentUser) return; // Ensure the user is logged in

    try {
      // Get the current user's Firestore document
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const ownerUserDocRef = doc(db, 'users', ownerId);

      // Update both users' friend lists by adding each other
      await updateDoc(currentUserDocRef, {
        friends: arrayUnion(ownerId),
      });

      await updateDoc(ownerUserDocRef, {
        friends: arrayUnion(currentUser.uid),
      });

      // Show success alert or message
      Alert.alert('Success', 'You are now friends!');
    } catch (error) {
      console.error('Error adding friend:', error);
      Alert.alert('Error', 'There was an error adding this user as a friend.');
    }
  };

  const handleSendMessage = () => {
    console.log('Send Message pressed');
    // Navigate to chat screen or handle sending message logic
    navigation.navigate('ChatScreen', { recipientId: ownerId });
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
        <Button 
          mode="contained" 
          onPress={handleAddFriend} 
          style={styles.button}
        >
          Add Friend
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSendMessage} 
          style={styles.button}
        >
          Message
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
