import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SignUpStyles } from '../styles/SignUpStyles';

interface SignUpUIProps {
  credentials: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (
    field: 'name' | 'email' | 'password' | 'confirmPassword',
    value: string
  ) => void;
  handleSignUp: () => void;
}

export default function SignUpUI({
  credentials,
  handleInputChange,
  handleSignUp,
}: SignUpUIProps) {
  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={credentials.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={SignUpStyles.input}
      />

      <TextInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        style={SignUpStyles.input}
      />

      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={SignUpStyles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={credentials.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
        secureTextEntry
        style={SignUpStyles.input}
      />

      <TouchableOpacity style={SignUpStyles.button} onPress={handleSignUp}>
        <Text style={SignUpStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
