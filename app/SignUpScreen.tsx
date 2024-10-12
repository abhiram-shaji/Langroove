// /app/SignUpScreen.tsx 

import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpStyles } from '../styles/SignUpStyles';

const SignUpScreen: React.FC = () => {
  const { credentials, handleInputChange, handleSignUp } = useSignUp();

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
};

export default SignUpScreen;
