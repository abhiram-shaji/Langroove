// /components/SignUpInput.tsx
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { SignUpStyles } from '../styles/SignUpStyles';
import { colors } from '../styles/themes';

interface SignUpInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
}

const SignUpInput: React.FC<SignUpInputProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => {
  return (
    <View>
      <TextInput
        style={SignUpStyles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.accent}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );
};

export default SignUpInput;
