// /hooks/useLogout.ts

import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth instance
import { Alert } from 'react-native';

export const useLogout = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Correct hook for navigation state

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);

      // Only navigate if the navigation state is mounted and ready
      if (navigationState?.key) {
        router.push('/LoginScreen'); // Navigate to the login screen after logout
      }
    } catch (error) {
      // Handle any errors during logout
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  useEffect(() => {
    if (navigationState?.key) {
      handleLogout();
    }
  }, [navigationState?.key]); // Ensures navigation is ready before redirecting

  return { handleLogout };
};
