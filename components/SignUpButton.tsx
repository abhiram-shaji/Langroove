// /components/SignUpButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SignUpStyles } from '../styles/SignUpStyles';

interface SignUpButtonProps {
  onPress: () => void;
  title: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={SignUpStyles.button} onPress={onPress}>
      <Text style={SignUpStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SignUpButton;
