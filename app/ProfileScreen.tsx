import React from 'react';
import { View } from 'react-native';
import { IconButton, Button } from 'react-native-paper'; // Import Button from react-native-paper
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App'; // Adjust the path if necessary

// Make sure the route refers to 'Profile' instead of 'ProfileScreen'
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params; // Get ownerId from navigation params

  const handleAddFriend = () => {
    console.log("Add Friend pressed");
    // Add your logic to send a friend request here
  };

  const handleSendMessage = () => {
    console.log("Send Message pressed");
    // Navigate to chat screen or handle sending message logic
    //navigation.navigate('ChatScreen', { recipientId: ownerId });
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
