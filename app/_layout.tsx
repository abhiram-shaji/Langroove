import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import SettingScreen from './SettingScreen';
import LoginScreen from './LoginScreen'; // Import your LoginScreen component
import { auth } from '../firebase'; // Import Firebase auth
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/themes'; // Assuming this is where your colors are defined
import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use null to represent the loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (isLoggedIn === null) {
    // Show a loading spinner while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: 'home-outline' | 'chatbubble-outline' | 'settings-outline' = 'home-outline';

              if (route.name === 'FeedScreen') {
                iconName = 'home-outline';
              } else if (route.name === 'ChatListScreen') {
                iconName = 'chatbubble-outline';
              } else if (route.name === 'SettingScreen') {
                iconName = 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'gray',
            headerShown: false, // Hide the header for all screens
          })}
        >
          <Tab.Screen name="FeedScreen" component={FeedScreen} />
          <Tab.Screen name="ChatListScreen" component={ChatListScreen} />
          <Tab.Screen name="SettingScreen" component={SettingScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen /> // Show the login screen if the user is not logged in
      )}
    </NavigationContainer>
  );
}
