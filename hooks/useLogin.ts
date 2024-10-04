// /hooks/useLogin.ts

import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface Credentials {
  username: string;
  password: string;
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const router = useRouter();

  // Handle input change for username and password
  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  // Handle login logic (can be extended to include API calls)
  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      Alert.alert('Error', 'Please fill out both fields');
    } else {
      // Simulate success and navigate to the Feed screen
      Alert.alert('Success', `Logged in as ${username}`);
      router.push('/FeedScreen');
    }
  };

  // Additional actions like sign up or forgot password could be handled here too
  const navigateToSignUp = () => {
    router.push('/SignUpScreen');
  };

  const navigateToForgotPassword = () => {
    router.push('/ForgotPasswordScreen');
  };

  return {
    credentials,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
  };
};
