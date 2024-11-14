import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTransition } from "../styles/transitions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Import Screens
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
import EditProfileScreen from "./EditProfileScreen";

// Components
import BottomNavBar from "../components/BottomNavBar";

// Define route types
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  TabScreens: undefined;
  Feed: undefined;
  Settings: undefined;
  Chat: { chatId: string };
  Profile: { ownerId: string };
  Friends: undefined;
  ChatListScreen: undefined;
  Privacy: undefined;
  About: undefined;
  AddTopic: undefined;
  EditProfileScreen: undefined; 
};

// Stack and Tab Navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Tab Screens Component
const TabScreens: React.FC = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="ChatListScreen" component={ChatListScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

// Main Stack Navigator
const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: '#f9bc60' },
      ...useTransition,
    }}
  >
    {/* Auth Screens */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

    {/* Main Tab Screens */}
    <Stack.Screen name="Feed" component={TabScreens} />

    {/* Additional Screens */}
    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }} initialParams={{ chatId: "" }} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="Friends" component={FriendListScreen} options={{ headerShown: true }} />
    <Stack.Screen name="AddTopic" component={AddTopicScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: true }} />
    <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

// Main App Component
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  if (loggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
