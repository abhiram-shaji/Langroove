import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsButton from "../components/SettingsButton";
import { styles } from "../styles/SettingsScreenStyles";
import BottomNavBar from "../components/BottomNavBar";
import { useLogout } from "../hooks/useLogout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Import StackNavigationProp
import { RootStackParamList } from "../app/App"; // Adjust the path to where RootStackParamList is defined
import { auth } from "../firebase"; // Import Firebase Auth

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

const SettingsScreen: React.FC = () => {
  const { handleLogout } = useLogout();
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // Use typed navigation
  const user = auth.currentUser; // Get the currently logged-in user

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate("Profile", { ownerId: user.uid }); // Navigate to the user's own profile
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Profile Button */}
        <SettingsButton
          title="Profile"
          onPress={handleProfilePress} // Navigate to own profile
        />

        <SettingsButton
          title="Friends"
          onPress={() => navigation.navigate("Friends")} 
        />

        {/* Test Screen Button */}
        <SettingsButton
          title="Go to Test Screen" 
          onPress={() => navigation.navigate("Test")} // Navigate to TestScreen
        />

        {/* Privacy Button */}
        <SettingsButton
          title="Privacy"
          onPress={() => console.log("Privacy pressed")}
        />

        {/* About Button */}
        <SettingsButton
          title="About"
          onPress={() => console.log("About pressed")}
        />

        {/* Logout Button */}
        <SettingsButton
          title="Logout"
          onPress={handleLogout} // Call the logout function
        />
      </View>
      <BottomNavBar />
    </SafeAreaProvider>
  );
};

export default SettingsScreen;
