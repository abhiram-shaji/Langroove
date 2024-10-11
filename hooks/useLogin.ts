// /hooks/useLogin.ts

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth

interface Credentials {
  username: string;
  password: string;
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Check navigation state

  // Handle input change for username and password
  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  // Handle login logic with Firebase Authentication
  const handleLogin = async () => {
    const { username, password } = credentials;

    if (!username || !password) {
      Alert.alert('Error', 'Please fill out both fields');
      return;
    }

    setLoading(true);

    try {
      // Use Firebase's signInWithEmailAndPassword function to authenticate
      await signInWithEmailAndPassword(auth, username, password);

      // Only navigate if the navigation state is mounted and ready
      if (navigationState?.key) {
        Alert.alert('Success', `Logged in as ${username}`);
        router.push('/FeedScreen'); // Redirect to FeedScreen after login
      }
    } catch (error: any) {
      // Handle Firebase authentication errors
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait for the navigation state to be ready before attempting navigation
    if (navigationState?.key && !loading) {
      handleLogin();
    }
  }, [navigationState?.key]); // Trigger when the navigation is ready

  return {
    credentials,
    loading,
    handleInputChange,
    handleLogin,
  };
};
