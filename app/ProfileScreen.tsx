import React from 'react';
import { View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'; // Correct import
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App'; // Import your RootStackParamList type

// Define navigation prop type
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Define route prop type
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Use typed navigation
  const route = useRoute<ProfileScreenRouteProp>(); // Use the useRoute hook to get params
  const { ownerId } = route.params; // Get ownerId from navigation params

  const handleAddFriend = () => {
    console.log('Add Friend pressed');
  };

  const handleSendMessage = () => {
    console.log('Send Message pressed');
    // Correctly navigate to the Chat screen with recipientId
    navigation.navigate('Chat', { recipientId: ownerId });
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
