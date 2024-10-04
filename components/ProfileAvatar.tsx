// /components/ProfileAvatar.tsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';

const ProfileAvatar: React.FC = () => {
  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image 
        size={120} 
        source={{ uri: 'https://robohash.org/avatar.png' }} 
        style={styles.avatar} 
      />
      <TouchableOpacity onPress={() => {}} style={styles.changeAvatarButton}>
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAvatar;
