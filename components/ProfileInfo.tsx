// /components/ProfileInfo.tsx

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import useUserInfo from '../hooks/useUserInfo'; // Import the new custom hook

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { userInfo, loading } = useUserInfo(userId); // Use the custom hook

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{userInfo.name || 'User'}</Text>
    </View>
  );
};

export default ProfileInfo;
