import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { createBottomTabNavigator, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useTransition } from "../styles/transitions";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import FeedScreen from "./FeedScreen";
import SettingsScreen from "./SettingScreen";
import ChatScreen from "./ChatScreen";
import ChatListScreen from "./ChatListScreen";
import FriendListScreen from "./FriendListScreen";
import ProfileScreen from "./ProfileScreen";
import AddTopicScreen from "./AddTopicScreen";
import PrivacyScreen from "./PrivacyScreen";
import AboutScreen from "./AboutScreen";

import BottomNavBar from "../components/BottomNavBar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Define types for route parameters
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  TabScreens: undefined;
  Feed: undefined;
  Settings: undefined;
  Chat: { chatId: string };
  FriendList: undefined;
  AddTopic: undefined;
  Profile: { ownerId: string };
  Friends: undefined;
  ChatListScreen: undefined;
  Privacy: undefined;
  About: undefined;
};

// Stack and Tab Navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Define TabScreens with correct types
const TabScreens = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Feed" component={FeedScreen as React.ComponentType} />
    <Tab.Screen name="ChatListScreen" component={ChatListScreen as React.ComponentType} />
    <Tab.Screen name="Settings" component={SettingsScreen as React.ComponentType} />
  </Tab.Navigator>
);

// StackNavigator with the corrected route name type
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: '#f9bc60' },
      ...useTransition,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

    {/* Main Screens with BottomNavBar */}
    <Stack.Screen name="Feed" component={TabScreens as React.ComponentType} />

    {/* Additional Screens without BottomNavBar */}
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerShown: true }}
      initialParams={{ chatId: "" }}
    />
    <Stack.Screen name="FriendList" component={FriendListScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Friends" component={FriendListScreen} options={{ headerShown: true }} />
    <Stack.Screen name="AddTopic" component={AddTopicScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: true }} />
    <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <StackNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
