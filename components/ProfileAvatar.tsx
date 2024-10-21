// /components/ProfileAvatar.tsx

import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import useUserInfo from '../hooks/useUserInfo'; // Import the new custom hook

interface ProfileAvatarProps {
  userId: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userId }) => {
  const { userInfo, loading } = useUserInfo(userId); // Use the custom hook

  if (loading) {
    return (
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={{ uri: 'https://robohash.org/default-avatar.png' }}
          style={styles.avatar}
        />
      </View>
    );
  }

  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image
        size={120}
        source={{ uri: userInfo.avatar || 'https://robohash.org/default-avatar.png' }}
        style={styles.avatar}
      />
    </View>
  );
};

export default ProfileAvatar;
