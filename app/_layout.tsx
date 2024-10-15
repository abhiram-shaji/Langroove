import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import SettingScreen from './SettingScreen';
import LoginScreen from './LoginScreen'; 
import { auth } from '../firebase'; 
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/themes';
import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: 'home-outline' | 'chatbubble-outline' | 'settings-outline';

  switch (routeName) {
    case 'FeedScreen':
      iconName = 'home-outline';
      break;
    case 'ChatListScreen':
      iconName = 'chatbubble-outline';
      break;
    case 'SettingScreen':
      iconName = 'settings-outline';
      break;
    default:
      iconName = 'home-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const AuthLoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (isLoggedIn === null) {
    return <AuthLoadingScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => renderTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header for all screens
      })}
    >
      <Tab.Screen name="FeedScreen" component={FeedScreen} />
      <Tab.Screen name="ChatListScreen" component={ChatListScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}
