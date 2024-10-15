// navigation/AppTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../FeedScreen';
import ChatListScreen from '../ChatListScreen';
import SettingScreen from '../SettingScreen';
import { colors } from '../../styles/themes';
import TabBarIcon from '../../components/TabBarIcon';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => <TabBarIcon routeName={route.name} color={color} size={size} />,
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
