import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LoginStyles } from '../styles/LoginStyles';

interface LoginUIProps {
  credentials: {
    username: string;
    password: string;
  };
  handleInputChange: (field: 'username' | 'password', value: string) => void;
  handleLogin: () => void;
  onSignUp: () => void;
}

export default function LoginUI({ credentials, handleInputChange, handleLogin, onSignUp }: LoginUIProps) {
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

      <TouchableOpacity style={LoginStyles.button} onPress={onSignUp}>
        <Text style={LoginStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
