import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { NavigationHelpers, TabNavigationState, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

type BottomNavBarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigation, state }) => {
  const currentScreenIndex = state.index;
  const animatedPosition = useRef(new Animated.Value(0)).current; // Animated value for position

  const [activeScreen, setActiveScreen] = useState(state.routes[currentScreenIndex].name); // Track the screen for color change

  const screenWidth = Dimensions.get('window').width;
  const iconWidth = screenWidth / state.routes.length; // Equal width for each icon

  useEffect(() => {
    // Animate to the new position whenever the screen changes
    Animated.timing(animatedPosition, {
      toValue: iconWidth * currentScreenIndex,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After animation completes, update the active screen
      setActiveScreen(state.routes[currentScreenIndex].name);
    });
  }, [currentScreenIndex]);

  const getIconColor = (screenName: string) =>
    activeScreen === screenName ? 'white' : 'black';

  const getLabelColor = (screenName: string) =>
    activeScreen === screenName ? { color: 'white' } : { color: 'black' };

  return (
    <View style={bottomNavBarStyles.container}>
      {/* Animated Background Square */}
      <Animated.View
        style={[
          bottomNavBarStyles.activeBackground,
          { transform: [{ translateX: animatedPosition }] },
        ]}
      />

      {/* Navigate to Feed screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Feed')}>
        <Ionicons name="home-outline" size={24} color={getIconColor('Feed')} />
        <Text style={[bottomNavBarStyles.label, getLabelColor('Feed')]}>Feed</Text>
      </TouchableOpacity>

      {/* Navigate to Chat List screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('ChatListScreen')}>
        <Ionicons name="chatbubble-outline" size={24} color={getIconColor('ChatListScreen')} />
        <Text style={[bottomNavBarStyles.label, getLabelColor('ChatListScreen')]}>Chats</Text>
      </TouchableOpacity>

      {/* Navigate to Settings screen */}
      <TouchableOpacity style={bottomNavBarStyles.navItem} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color={getIconColor('Settings')} />
        <Text style={[bottomNavBarStyles.label, getLabelColor('Settings')]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
