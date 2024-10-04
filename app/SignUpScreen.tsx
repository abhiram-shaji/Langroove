// /screens/SignUpScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import SignUpInput from '../components/SignUpInput';
import SignUpButton from '../components/SignUpButton';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpStyles } from '../styles/SignUpStyles';

const SignUpScreen: React.FC = () => {
  const { credentials, handleInputChange, handleSignUp } = useSignUp();

  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      {/* Name Input */}
      <SignUpInput
        placeholder="Name"
        value={credentials.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      {/* Email Input */}
      <SignUpInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <SignUpInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />

      {/* Confirm Password Input */}
      <SignUpInput
        placeholder="Confirm Password"
        value={credentials.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <SignUpButton title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
