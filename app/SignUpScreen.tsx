import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpStyles } from '../styles/SignUpStyles';

const SignUpScreen: React.FC = () => {
  const { credentials, errors, loading, handleInputChange, handleSignUp } = useSignUp();

  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={credentials.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={SignUpStyles.input}
      />
      {errors.name && <Text style={SignUpStyles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        style={SignUpStyles.input}
      />
      {errors.email && <Text style={SignUpStyles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={SignUpStyles.input}
      />
      {errors.password && <Text style={SignUpStyles.errorText}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm Password"
        value={credentials.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
        secureTextEntry
        style={SignUpStyles.input}
      />
      {errors.confirmPassword && <Text style={SignUpStyles.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity style={SignUpStyles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={SignUpStyles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      
      {errors.general && <Text style={SignUpStyles.errorText}>{errors.general}</Text>}
    </View>
  );
};

export default SignUpScreen;
