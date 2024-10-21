import React from 'react';
import { View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App';
import { useProfileActions } from '../hooks/useProfileActions';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth } from '../firebase';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Use navigation here
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params; // Get ownerId from navigation params
  const { handleAddFriend, handleSendMessage, loading } = useProfileActions(ownerId); // Use the hook
  const currentUser = auth.currentUser; // Get current logged-in user

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => navigation.goBack()} // Correctly reference navigation here
        style={styles.backButton}
      />

      {/* Profile Avatar Section */}
      <ProfileAvatar userId={ownerId} />

      {/* User Info Section */}
      <ProfileInfo userId={ownerId} />

      {/* Conditionally render the buttons if ownerId is different from currentUser.uid */}
      {currentUser?.uid !== ownerId && (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleAddFriend} style={styles.button} loading={loading}>
            Add Friend
          </Button>
          <Button mode="contained" onPress={handleSendMessage} style={styles.button}>
            Message
          </Button>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
