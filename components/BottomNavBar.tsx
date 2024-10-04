import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { useNavigation } from '../hooks/useNavigation'; // Custom hook for navigation

const BottomNavBar: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <View style={bottomNavBarStyles.container}>
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigateTo('/FeedScreen')}>
        <Ionicons name="home-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Feed</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigateTo('/ChatListScreen')}>
        <Ionicons name="chatbubble-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Messages</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigateTo('/SettingScreen')}>
        <Ionicons name="settings-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
