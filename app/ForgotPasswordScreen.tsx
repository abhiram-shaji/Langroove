// ForgotPasswordScreen.tsx

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForgotPassword } from '../hooks/useForgotPassword';
import ResetPasswordButton from '../components/ResetPasswordButton';
import { styles } from '../styles/ForgotPasswordScreenStyles';
import { colors } from '../styles/themes';

const ForgotPasswordScreen: React.FC = () => {
  const { email, setEmail, handleResetPassword, navigateLogin } = useForgotPassword();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.instructions}>Enter your email address to reset your password:</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={colors.disabled}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <ResetPasswordButton onPress={handleResetPassword} />

      <TouchableOpacity style={styles.backToLogin} onPress={navigateLogin}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
