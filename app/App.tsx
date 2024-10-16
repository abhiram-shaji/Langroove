import { registerRootComponent } from 'expo';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, NavigationContainerRefWithCurrent } from '@react-navigation/native'; // Correct import
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

// Import your screens
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import FeedScreen from './FeedScreen';

// Define the type for your navigation routes
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Feed: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Use correct type for navigationRef with the defined route params
  const navigationRef = useRef<NavigationContainerRefWithCurrent<RootStackParamList>>(null);

  useEffect(() => {
    if (loggedIn && navigationRef.current) {
      // Ensure navigationRef is ready before navigating
      navigationRef.current.navigate('Feed');
    }
  }, [loggedIn]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Register the component with Expo
registerRootComponent(App);