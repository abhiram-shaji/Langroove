import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';
import { RootStackParamList } from '../app/App';
import { useProfileActions } from '../hooks/useProfileActions';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params;
  const { handleAddFriend, handleSendMessage, loading } = useProfileActions(ownerId);
  const currentUser = auth.currentUser;
  
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriendStatus = async () => {
      if (currentUser) {
        const currentUserDocRef = doc(db, 'users', currentUser.uid);
        const currentUserDoc = await getDoc(currentUserDocRef);

        if (currentUserDoc.exists()) {
          const userFriends = currentUserDoc.data().friends || [];
          setIsFriend(userFriends.includes(ownerId));
        }
      }
    };

    checkFriendStatus();
  }, [currentUser, ownerId]);

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />

      <ProfileAvatar userId={ownerId} />
      <ProfileInfo userId={ownerId} />

      {/* If the profile belongs to the current user, show Edit Profile button */}
      {currentUser?.uid === ownerId ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EditProfileScreen')}
          style={styles.button}
        >
          Edit Profile
        </Button>
      ) : (
        // If not the owner, show Add Friend and Message buttons
        <View style={styles.buttonContainer}>
          {!isFriend && (
            <Button mode="contained" onPress={handleAddFriend} style={styles.button} loading={loading}>
              Add Friend
            </Button>
          )}
          <Button mode="contained" onPress={handleSendMessage} style={styles.button}>
            Message
          </Button>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
