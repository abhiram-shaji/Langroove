import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { LoginStyles } from '../styles/LoginStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
  const {
    credentials,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
    error,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Langroove</Text>

      <TextInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        style={LoginStyles.input}
      />

      <View style={LoginStyles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={!showPassword}
          style={LoginStyles.inputPassword}
        />
        <TouchableOpacity
          style={LoginStyles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

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
