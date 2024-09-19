// signup.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SignUpStyles from './styles/SignUpStyles'; // Import SignUpStyles
import { colors } from './styles/themes'; // Import colors from themes.ts

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log('Sign Up clicked');
  };

  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      <TextInput
        style={SignUpStyles.input}
        placeholder="Email"
        placeholderTextColor={colors.accent}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={SignUpStyles.input}
        placeholder="Password"
        placeholderTextColor={colors.accent}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={SignUpStyles.button} onPress={handleSignUp}>
        <Text style={SignUpStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
