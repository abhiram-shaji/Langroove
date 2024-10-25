import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { LoginStyles } from '../styles/LoginStyles';

export default function Login() {
  const {
    credentials,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
    error,
  } = useLogin();

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Langroove</Text>

      <TextInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        style={LoginStyles.input}
      />

      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={LoginStyles.input}
      />
      
      {/* Display the error message below the password field */}
      {error ? <Text style={LoginStyles.errorText}>{error}</Text> : null}

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
