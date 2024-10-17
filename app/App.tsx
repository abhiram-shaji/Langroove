import { registerRootComponent } from 'expo';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import SettingsScreen from './SettingScreen';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Feed: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  Feed: undefined;
  ChatList: undefined;
  Settings: undefined;
};

// Create stack navigators
const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

// Authentication stack navigator
const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

// Main app stack navigator
const AppStackNavigator: React.FC = () => {
  return (
    <AppStack.Navigator initialRouteName="Feed">
      <AppStack.Screen name="Feed" component={FeedScreen} />
      <AppStack.Screen name="ChatList" component={ChatListScreen} />
      <AppStack.Screen name="Settings" component={SettingsScreen} />
    </AppStack.Navigator>
  );
};

// Main App Component
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setLoggedIn(!!token);  // If token exists, set logged in to true
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      {loggedIn ? <AppStackNavigator /> : <AuthStackNavigator />} 
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
