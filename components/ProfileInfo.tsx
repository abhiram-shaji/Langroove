// /components/ProfileInfo.tsx

import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import useUserInfo from '../hooks/useUserInfo';
import { useFlags } from '../hooks/useFlags';

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { userInfo, loading } = useUserInfo(userId);
  const { getFlagUrl } = useFlags();

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Loading...</Text>
      </View>
    );
  }

  const renderLanguagesWithFlags = (languages: string[] | undefined) => {
    return languages?.length ? (
      languages.map((language) => (
        <View key={language} style={styles.languageCard}>
          <Image source={{ uri: getFlagUrl(language) }} style={styles.flagIcon} />
          <Text style={[styles.languageText, { flex: 1 }]} >{language}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.languagePlaceholder}>Not specified</Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{userInfo.name || 'User'}</Text>
      <Text style={styles.bio}>{userInfo.bio || 'No bio available'}</Text>

      <View style={styles.languagesContainer}>
        <Text style={styles.languagesLabel}>Native</Text>
        {renderLanguagesWithFlags(userInfo.nativeLanguages)}

        <Text style={styles.languagesLabel}>Fluent</Text>
        {renderLanguagesWithFlags(userInfo.fluentLanguages)}

        <Text style={styles.languagesLabel}>Learning</Text>
        {renderLanguagesWithFlags(userInfo.learningLanguages)}
      </View>
    </ScrollView>
  );
};

export default ProfileInfo;
