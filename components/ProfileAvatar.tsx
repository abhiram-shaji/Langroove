// /components/ProfileAvatar.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';

// Helper function to generate a random string
const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const ProfileAvatar: React.FC = () => {
  const [avatarUri, setAvatarUri] = useState('https://robohash.org/avatar.png');

  const handleChangeAvatar = () => {
    // Generate a random string and use it in the avatar URL
    const randomString = generateRandomString(10);
    const newAvatarUri = `https://robohash.org/${randomString}.png`;
    setAvatarUri(newAvatarUri);
  };

  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image 
        size={120} 
        source={{ uri: avatarUri }} 
        style={styles.avatar} 
      />
      <TouchableOpacity onPress={handleChangeAvatar} style={styles.changeAvatarButton}>
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAvatar;
