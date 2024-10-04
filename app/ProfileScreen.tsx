// /screens/ProfileScreen.tsx

import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileInfo from '../components/ProfileInfo';
import { styles } from '../styles/ProfileScreenStyles';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

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
      <ProfileAvatar />

      {/* User Info Section */}
      <ProfileInfo />
    </View>
  );
};

export default ProfileScreen;
