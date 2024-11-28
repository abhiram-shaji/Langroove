import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../styles/SettingsScreenStyles";
import { MaterialIcons } from "@expo/vector-icons";

interface SettingsButtonProps {
  title: string;
  onPress: () => void;
  iconName: React.ComponentProps<typeof MaterialIcons>["name"]; // Ensure the icon name is valid
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ title, onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;
