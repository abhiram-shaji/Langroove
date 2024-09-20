import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SignUpStyles from '../styles/SignUpStyles';
import { colors } from '../styles/themes'; 

interface SignUpUIProps {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSignUp: () => void;
}

const SignUpUI: React.FC<SignUpUIProps> = ({ email, password, onEmailChange, onPasswordChange, onSignUp }) => {
  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      <TextInput
        style={SignUpStyles.input}
        placeholder="Email"
        placeholderTextColor={colors.accent}
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={SignUpStyles.input}
        placeholder="Password"
        placeholderTextColor={colors.accent}
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
      />

      <TouchableOpacity style={SignUpStyles.button} onPress={onSignUp}>
        <Text style={SignUpStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpUI;
