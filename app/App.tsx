import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTransition } from "../styles/transitions";
import { onAuthStateChanged, User, reload } from "firebase/auth";
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
import WaitingForVerificationScreen from "./WaitingForVerificationScreen"; // New screen

// Components
import BottomNavBar from "../components/BottomNavBar";

// Define route types
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  TabScreens: undefined;
  WaitingForVerification: undefined;
  Chat: { chatId: string };
  Profile: { ownerId: string };
  Friends: undefined;
  ChatListScreen: undefined;
  Privacy: undefined;
  About: undefined;
  AddTopic: undefined;
  EditProfileScreen: undefined;
  Feed: undefined;
  Settings: undefined;
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
const StackNavigator: React.FC<{ user: User | null; isEmailVerified: boolean }> = ({ user, isEmailVerified }) => {
  // Determine the initial route based on authentication and verification status
  const initialRouteName = user
    ? isEmailVerified
      ? "TabScreens"
      : "WaitingForVerification"
    : "Login";

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#f9bc60' },
        ...useTransition,
      }}
    >
      {/* All screens are included here without conditional logic */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="WaitingForVerification" component={WaitingForVerificationScreen} />
      <Stack.Screen name="TabScreens" component={TabScreens} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }} initialParams={{ chatId: "" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Friends" component={FriendListScreen} options={{ headerShown: true }} />
      <Stack.Screen name="AddTopic" component={AddTopicScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: true }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

// Main App Component
const App: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined); // `undefined` indicates loading state
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await reload(currentUser); // Reload user to get updated verification status
        setUser(currentUser);
        setIsEmailVerified(currentUser.emailVerified); // Update verification status
      } else {
        setUser(null);
        setIsEmailVerified(false);
      }
    });
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return ( // Show loading until authentication status is determined
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator user={user} isEmailVerified={isEmailVerified} />
    </NavigationContainer>
  );
};

// Register the root component
registerRootComponent(App);

export default App;
