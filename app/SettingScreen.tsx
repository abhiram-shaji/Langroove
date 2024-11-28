import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsButton from "../components/SettingsButton";
import { styles } from "../styles/SettingsScreenStyles";
import { useLogout } from "../hooks/useLogout";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../app/App";
import { auth } from "../firebase";

type SettingsScreenProps = StackScreenProps<RootStackParamList, "Settings">;

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
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        {/* Settings Buttons */}
        <View style={styles.settingsContainer}>
          <SettingsButton title="Profile" iconName="person-outline" onPress={handleProfilePress} />
          <SettingsButton title="Friends" iconName="group" onPress={() => navigation.navigate("Friends")} />
          <SettingsButton title="Privacy" iconName="lock-outline" onPress={() => navigation.navigate("Privacy")} />
          <SettingsButton title="About" iconName="info-outline" onPress={() => navigation.navigate("About")} />
          <SettingsButton title="Logout" iconName="logout" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SettingsScreen;
