import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/themes';  // Import colors from themes.ts

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Add logic to handle password reset
    console.log(`Password reset link sent to ${email}`);
  };

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

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backToLogin} onPress={() => console.log('Navigate back to login screen')}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLogin: {
    marginTop: 20,
  },
  backToLoginText: {
    color: colors.accent,
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
