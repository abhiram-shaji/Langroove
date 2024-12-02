import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/ThemeScreenStyles";
import { useTheme } from "../hooks/useTheme";

const ThemeScreen = () => {
  const { currentThemeIndex, changeTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.headline }]}>
        Select a Theme
      </Text>
      <View style={styles.radioGroup}>
        {Array.from({ length: 10 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioButton}
            onPress={() => changeTheme(index)}
          >
            <View
              style={[
                styles.radioOuter,
                currentThemeIndex === index && { backgroundColor: colors.accent },
              ]}
            />
            <Text style={[styles.label, { color: colors.paragraph }]}>
              Theme {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ThemeScreen;
