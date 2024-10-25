import { registerRootComponent } from "expo";

import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

// Import Firebase Auth
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedIn ? "Feed" : "Login"}
        screenOptions={{
          headerShown: false,
          ...useTransition,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        <Stack.Screen name="Feed" component={FeedScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ChatListScreen" component={ChatListScreen} />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: true }} // Enable header only for ChatScreen
          initialParams={{ chatId: "" }} // Include chatId as initial param
        />

        <Stack.Screen name="FriendList" component={FriendListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Friends" options={{ headerShown: true }} component={FriendListScreen} />
        <Stack.Screen name="AddTopic" options={{ headerShown: true }} component={AddTopicScreen} />

        <Stack.Screen name="Privacy" options={{ headerShown: true }} component={PrivacyScreen} />
        <Stack.Screen name="About" options={{ headerShown: true }} component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
