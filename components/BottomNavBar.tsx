import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { NavigationHelpers, TabNavigationState, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs'; // Corrected import

type BottomNavBarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigation, state }) => {
  const currentScreen = state.routes[state.index].name; // Get the name of the current active screen

  // Function to determine the icon style based on the active screen
  const getIconStyle = (screenName: string) => {
    return {
      color: currentScreen === screenName ? 'black' : 'gray', // Black if active, gray if inactive
      size: currentScreen === screenName ? 28 : 24, // Larger size if active
    };
  };

  // Function to determine the text style based on the active screen
  const getTextStyle = (screenName: string) => {
    return {
      color: currentScreen === screenName ? 'black' : 'gray', // Black if active, gray if inactive
      fontWeight: currentScreen === screenName ? 'bold' as 'bold' | 'normal' : 'normal' as 'bold' | 'normal', // Bold if active
    };
  };

  return (
    <View style={bottomNavBarStyles.container}>
      {/* Navigate to Feed screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Feed')}>
        <Ionicons name="home-outline" size={getIconStyle('Feed').size} color={getIconStyle('Feed').color} />
        <Text style={getTextStyle('Feed')}>Feed</Text>
      </TouchableOpacity>

      {/* Navigate to Chat List screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('ChatListScreen')}>
        <Ionicons name="chatbubble-outline" size={getIconStyle('ChatListScreen').size} color={getIconStyle('ChatListScreen').color} />
        <Text style={getTextStyle('ChatListScreen')}>Chats</Text>
      </TouchableOpacity>

      {/* Navigate to Settings screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={getIconStyle('Settings').size} color={getIconStyle('Settings').color} />
        <Text style={getTextStyle('Settings')}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
