import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpStyles } from '../styles/SignUpStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/themes';

const SignUpScreen: React.FC = () => {
  const { credentials, errors, loading, handleInputChange, handleSignUp } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Disable the button if email or password validation fails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(credentials.email);
    const isPasswordValid = credentials.password.length >= 6;

    setIsButtonDisabled(!isEmailValid || !isPasswordValid);
  }, [credentials.email, credentials.password]);

  return (
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
          placeholderTextColor={colors.paragraph}
          value={credentials.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={SignUpStyles.input}
      />
      {errors.name && <Text style={SignUpStyles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
          placeholderTextColor={colors.paragraph}
          value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        style={SignUpStyles.input}
      />
      {errors.email && <Text style={SignUpStyles.errorText}>{errors.email}</Text>}

      <View style={SignUpStyles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.paragraph}
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={!showPassword}
          style={SignUpStyles.input}
        />
        <TouchableOpacity
          style={SignUpStyles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={SignUpStyles.errorText}>{errors.password}</Text>}

      <View style={SignUpStyles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={colors.paragraph}
          value={credentials.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          secureTextEntry={!showPassword}
          style={SignUpStyles.input}
        />
        <TouchableOpacity
          style={SignUpStyles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={SignUpStyles.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity
        style={[SignUpStyles.button, isButtonDisabled && SignUpStyles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={isButtonDisabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.headline} />
        ) : (
          <Text style={SignUpStyles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {errors.general && <Text style={SignUpStyles.errorText}>{errors.general}</Text>}
    </View>
  );
};

export default SignUpScreen;
