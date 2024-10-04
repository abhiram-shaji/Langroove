// /components/SettingsButton.tsx

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '../styles/SettingsScreenStyles';

interface SettingsButtonProps {
  title: string;
  onPress: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;
