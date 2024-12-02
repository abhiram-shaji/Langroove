import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/ThemeScreenStyles"; // Import styles

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
