// /components/ProfileAvatar.tsx

import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import { auth, db } from '../firebase'; // Assuming these are exported from firebase.ts
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods to get data

const ProfileAvatar: React.FC = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Fetch user data, including the avatar URL, when the component mounts
  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Get the user's document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Set the avatar URI from Firestore
            setAvatarUri(userData?.avatar || 'https://robohash.org/default-avatar.png');
          }
        }
      } catch (error) {
        console.log('Error fetching user avatar:', error);
      }
    };

    fetchUserAvatar();
  }, []);

  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image 
        size={120} 
        source={{ uri: avatarUri || 'https://robohash.org/default-avatar.png' }} 
        style={styles.avatar} 
      />
      <TouchableOpacity disabled style={styles.changeAvatarButton}>
        <Text style={styles.changeAvatarText}>Change User Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAvatar;

