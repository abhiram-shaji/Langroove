// /components/ProfileInfo.tsx

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import useUserInfo from '../hooks/useUserInfo';

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { userInfo, loading } = useUserInfo(userId);

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{userInfo.name || 'User'}</Text>
      <Text style={styles.bio}>{userInfo.bio || 'No bio available'}</Text>

      <View style={styles.languagesContainer}>
        <Text style={styles.languagesLabel}>Native Languages:</Text>
        {userInfo.nativeLanguages?.length ? (
          <Text style={styles.languageText}>{userInfo.nativeLanguages.join(', ')}</Text>
        ) : (
          <Text style={styles.languagePlaceholder}>Not specified</Text>
        )}

        <Text style={styles.languagesLabel}>Fluent Languages:</Text>
        {userInfo.fluentLanguages?.length ? (
          <Text style={styles.languageText}>{userInfo.fluentLanguages.join(', ')}</Text>
        ) : (
          <Text style={styles.languagePlaceholder}>Not specified</Text>
        )}

        <Text style={styles.languagesLabel}>Learning Languages:</Text>
        {userInfo.learningLanguages?.length ? (
          <Text style={styles.languageText}>{userInfo.learningLanguages.join(', ')}</Text>
        ) : (
          <Text style={styles.languagePlaceholder}>Not specified</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileInfo;
