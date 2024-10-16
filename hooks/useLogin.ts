import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation, NavigationProp } from '@react-navigation/native';  // Import React Navigation hook and types
import { RootStackParamList } from '../App'; 

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
  const [loggedIn, setLoggedIn] = useState(false);

  // Correctly type the navigation prop with RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      await signInWithEmailAndPassword(auth, username, password);
      Alert.alert('Success', `Logged in as ${username}`);
      setLoggedIn(true);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate after login success
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('Feed');  // Use navigation to go to FeedScreen
    }
  }, [loggedIn, navigation]);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return {
    credentials,
    loading,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
  };
};
