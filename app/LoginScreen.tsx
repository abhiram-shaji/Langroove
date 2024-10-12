// /app/login.tsx

import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useLogin'; // Import the custom hook
import { LoginStyles } from '../styles/LoginStyles';

export default function Login() {
  // Use the custom hook to get all the login logic
  const {
    credentials,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
  } = useLogin();

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Langroove</Text>

      <TextInput
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) => handleInputChange('username', text)}
        style={LoginStyles.input}
      />

      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={LoginStyles.input}
      />

      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={LoginStyles.button} onPress={navigateToSignUp}>
        <Text style={LoginStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={LoginStyles.forgotPassword} onPress={navigateToForgotPassword}>
        <Text style={LoginStyles.forgotPasswordText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}
