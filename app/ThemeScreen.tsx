import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/themes";

const themes = Array.from({ length: 10 }, (_, i) => `Theme ${i + 1}`);

const ThemeScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);

  const handleThemeSelect = (index: number) => {
    setSelectedTheme(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Theme</Text>
      <View style={styles.radioGroup}>
        {themes.map((theme, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioButton}
            onPress={() => handleThemeSelect(index)}
          >
            <View
              style={[
                styles.radioOuter,
                selectedTheme === index && styles.radioOuterSelected,
              ]}
            >
              {selectedTheme === index && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.label}>{theme}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ThemeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.background,
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  radioOuterSelected: {
    backgroundColor: colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.secondary,
    marginLeft: 10,
  },
});
