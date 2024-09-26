import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
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

      {/* Profile Picture Section */}
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

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.label}>Languages Known: English, Spanish</Text>
        <Text style={styles.label}>Languages Learning: French, German</Text>
        <Text style={styles.label}>User Since: January 2023</Text>
        <Text style={styles.bio}>Bio: Enthusiastic language learner, loves traveling and meeting new people!</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    marginBottom: 10,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  bio: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
});
