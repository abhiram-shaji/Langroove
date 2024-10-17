// /hooks/useLogout.ts

import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth instance
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App'; // Adjust the import path as necessary

export const useLogout = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      // Navigate to the login screen after logout
      navigation.navigate('Login'); // Use the correct screen name as defined in your navigator
    } catch (error) {
      // Handle any errors during logout
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return { handleLogout };
};
