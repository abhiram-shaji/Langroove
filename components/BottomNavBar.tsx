import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { NavigationHelpers, TabNavigationState, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

type BottomNavBarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigation, state }) => {
  const currentScreen = state.routes[state.index].name; // Get the name of the current active screen

  // Function to determine the icon color based on the active screen
  const getIconColor = (screenName: string) => (currentScreen === screenName ? 'white' : 'black');

  return (
    <View style={bottomNavBarStyles.container}>
      {/* Navigate to Feed screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Feed')}>
        <View
          style={[
            bottomNavBarStyles.iconContainer,
            currentScreen === 'Feed' && bottomNavBarStyles.activeBackground, // Apply black background only if active
          ]}
        >
          <Ionicons name="home-outline" size={24} color={getIconColor('Feed')} />
        </View>
        <Text style={bottomNavBarStyles.label}>Feed</Text>
      </TouchableOpacity>

      {/* Navigate to Chat List screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('ChatListScreen')}>
        <View
          style={[
            bottomNavBarStyles.iconContainer,
            currentScreen === 'ChatListScreen' && bottomNavBarStyles.activeBackground, // Apply black background only if active
          ]}
        >
          <Ionicons name="chatbubble-outline" size={24} color={getIconColor('ChatListScreen')} />
        </View>
        <Text style={bottomNavBarStyles.label}>Chats</Text>
      </TouchableOpacity>

      {/* Navigate to Settings screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Settings')}>
        <View
          style={[
            bottomNavBarStyles.iconContainer,
            currentScreen === 'Settings' && bottomNavBarStyles.activeBackground, // Apply black background only if active
          ]}
        >
          <Ionicons name="settings-outline" size={24} color={getIconColor('Settings')} />
        </View>
        <Text style={bottomNavBarStyles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
