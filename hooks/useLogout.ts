// /hooks/useLogout.ts

import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth instance
import { Alert } from 'react-native';

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      // Navigate to the login screen after logout
      router.push('/LoginScreen');
    } catch (error) {
      // Handle any errors during logout
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return { handleLogout };
};
