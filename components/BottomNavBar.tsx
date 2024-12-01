import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavBarStyles } from '../styles/BottomNavBarStyles';
import { colors } from '../styles/themes';

import {
  NavigationHelpers,
  TabNavigationState,
  ParamListBase,
} from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

type BottomNavBarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigation, state }) => {
  const currentScreenIndex = state.index;
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const animatedLeft = useRef(new Animated.Value((Dimensions.get('window').width - Dimensions.get('window').width * 0.7) / 2)).current;
  const screenWidth = Dimensions.get('window').width;
  const navBarWidth = screenWidth * 0.7;
  const iconWidth = navBarWidth / state.routes.length;
  const [activeScreen, setActiveScreen] = useState(
    state.routes[currentScreenIndex].name
  );

  useEffect(() => {
    const isFeedScreen = state.routes[currentScreenIndex].name === 'Feed';

    // Animate navbar position
    Animated.timing(animatedLeft, {
      toValue: isFeedScreen ? 20 : (screenWidth - navBarWidth) / 2,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animate the active indicator position
    Animated.timing(animatedPosition, {
      toValue: iconWidth * currentScreenIndex,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveScreen(state.routes[currentScreenIndex].name);
    });
  }, [currentScreenIndex]);

  const getIconColor = (screenName: string) =>
    activeScreen === screenName ? colors.paragraph : colors.headline;

  const getLabelColor = (screenName: string) =>
    activeScreen === screenName
      ? { color: colors.paragraph }
      : { color: colors.headline };

  return (
    <Animated.View
      style={[
        bottomNavBarStyles.container,
        { width: navBarWidth, left: animatedLeft },
      ]}
    >
      {/* Animated Background Circle */}
      <Animated.View
        style={[
          bottomNavBarStyles.activeBackground,
          {
            transform: [{ translateX: animatedPosition }],
            left: (iconWidth - 50) / 2, // Center active background with each icon
          },
        ]}
      />

      {/* Navigate to Feed screen */}
      <TouchableOpacity
        style={bottomNavBarStyles.navItem}
        onPress={() => navigation.navigate('Feed')}
      >
        <Ionicons name="home-outline" size={24} color={getIconColor('Feed')} />
        <Text style={[bottomNavBarStyles.label, getLabelColor('Feed')]}>
          Feed
        </Text>
      </TouchableOpacity>

      {/* Navigate to Chat List screen */}
      <TouchableOpacity
        style={bottomNavBarStyles.navItem}
        onPress={() => navigation.navigate('ChatListScreen')}
      >
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color={getIconColor('ChatListScreen')}
        />
        <Text
          style={[bottomNavBarStyles.label, getLabelColor('ChatListScreen')]}
        >
          Chats
        </Text>
      </TouchableOpacity>

      {/* Navigate to Settings screen */}
      <TouchableOpacity
        style={bottomNavBarStyles.navItem}
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color={getIconColor('Settings')}
        />
        <Text style={[bottomNavBarStyles.label, getLabelColor('Settings')]}>
          Settings
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BottomNavBar;
