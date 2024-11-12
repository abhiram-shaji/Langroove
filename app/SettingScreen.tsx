import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsButton from "../components/SettingsButton";
import { styles } from "../styles/SettingsScreenStyles";
import { useLogout } from "../hooks/useLogout";
import { StackScreenProps } from "@react-navigation/stack"; // Import StackScreenProps
import { RootStackParamList } from "../app/App";
import { auth } from "../firebase";

// Define SettingsScreen's props using StackScreenProps
type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { handleLogout } = useLogout();
  const user = auth.currentUser;

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate("Profile", { ownerId: user.uid });
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SettingsButton title="Profile" onPress={handleProfilePress} />
        <SettingsButton title="Friends" onPress={() => navigation.navigate("Friends")} />
        <SettingsButton title="Privacy" onPress={() => navigation.navigate("Privacy")} />
        <SettingsButton title="About" onPress={() => navigation.navigate("About")} />
        <SettingsButton title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaProvider>
  );
};

export default SettingsScreen;
