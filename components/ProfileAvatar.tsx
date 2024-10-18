// /components/ProfileAvatar.tsx

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import { db } from '../firebase'; // Assuming these are exported from firebase.ts
import { doc, getDoc } from 'firebase/firestore';

interface ProfileAvatarProps {
  userId: string; // Accept userId as prop
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userId }) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    fetchUserAvatar();
  }, [userId]);

  const fetchUserAvatar = async () => {
    try {
      if (userId) {
        // Get the user's document from Firestore using userId
        const userDoc = await getDoc(doc(db, 'users', userId));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAvatarUri(userData?.avatar || 'https://robohash.org/default-avatar.png');
        }
      }
    } catch (error) {
      console.log('Error fetching user avatar:', error);
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image 
        size={120} 
        source={{ uri: avatarUri || 'https://robohash.org/default-avatar.png' }} 
        style={styles.avatar} 
      />
    </View>
  );
};

export default ProfileAvatar;
