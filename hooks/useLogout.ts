import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFeed } from './useFeed'; // Import your feed hook

export const useLogout = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { unsubscribeRef } = useFeed(); // Access the ref storing the unsubscribe function

  const clearCache = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'Failed to clear cache. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      // Stop any active snapshot listeners
      if (unsubscribeRef?.current) {
        unsubscribeRef.current(); // Unsubscribe from snapshot listener
        console.log('Snapshot listener stopped.');
      }

      // Clear AsyncStorage before logging out
      await clearCache();

      // Sign out the user from Firebase auth
      await signOut(auth);

      // Navigate to the login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      // Handle any errors during logout
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return { handleLogout };
};
