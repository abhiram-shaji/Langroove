// /components/ProfileInfo.tsx

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';

const ProfileInfo: React.FC = () => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.label}>Languages Known: English, Spanish</Text>
      <Text style={styles.label}>Languages Learning: French, German</Text>
      <Text style={styles.label}>User Since: January 2023</Text>
      <Text style={styles.bio}>
        Bio: Enthusiastic language learner, loves traveling and meeting new people!
      </Text>
    </View>
  );
};

export default ProfileInfo;
