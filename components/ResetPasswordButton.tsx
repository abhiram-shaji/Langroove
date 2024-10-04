// /components/ResetPasswordButton.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/ForgotPasswordScreenStyles';

interface ResetPasswordButtonProps {
  onPress: () => void;
}

const ResetPasswordButton: React.FC<ResetPasswordButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Send Reset Link</Text>
    </TouchableOpacity>
  );
};

export default ResetPasswordButton;
