import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpStyles } from '../styles/SignUpStyles';
import { MaterialIcons } from '@expo/vector-icons';

const SignUpScreen: React.FC = () => {
  const { credentials, errors, loading, handleInputChange, handleSignUp } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

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

      <View style={SignUpStyles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={!showPassword}
          style={SignUpStyles.inputPassword}
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
          value={credentials.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          secureTextEntry={!showPassword}
          style={SignUpStyles.inputPassword}
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
