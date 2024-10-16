import { registerRootComponent } from 'expo';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

// Create stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main App Component
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigationRef = useRef<NavigationContainerRefWithCurrent<RootStackParamList>>(null);

  useEffect(() => {
    // Navigate to Feed if the user is logged in
    if (loggedIn && navigationRef.current) {
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

// Register the root component
registerRootComponent(App);

export default App;
