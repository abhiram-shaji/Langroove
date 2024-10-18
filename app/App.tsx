// App.tsx

import { registerRootComponent } from 'expo';

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import SettingsScreen from './SettingScreen';

import ChatScreen from './ChatScreen';
import FriendListScreen from './FriendListScreen';
import ProfileScreen from './ProfileScreen';

import AddTopicScreen from './AddTopicScreen';

// Import Firebase Auth
import { auth } from '../firebase'; // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Feed: undefined;
  ChatList: undefined;
  Settings: undefined;
  Chat: undefined;
  FriendList: undefined;
  AddTopic: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user); // Set loggedIn to true if user exists
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loggedIn === null) {
    // Show a loading indicator while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedIn ? 'Feed' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* New Screens */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="FriendList" component={FriendListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddTopic" component={AddTopicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
