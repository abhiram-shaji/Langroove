import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';  // Import the AppStackParamList for the main app flow

// Correctly type the navigation hook with AppStackParamList
const BottomNavBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  // Use AppStackParamList for app navigation

  return (
    <View style={bottomNavBarStyles.container}>
      {/* Navigate to Feed screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Feed')}>
        <Ionicons name="home-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Feed</Text>
      </TouchableOpacity>

      {/* Navigate to Chat List screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('ChatListScreen')}>
        <Ionicons name="chatbubble-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Chats</Text> 
      </TouchableOpacity>

      {/* Navigate to Settings screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="gray" />
        <Text style={bottomNavBarStyles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
