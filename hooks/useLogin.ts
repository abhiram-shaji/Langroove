import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../app/App'; 

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

  // Type the navigation prop with RootStackParamList to ensure correct route navigation
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  // Handle input change for username and password
  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
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
      // Firebase auth login
      await signInWithEmailAndPassword(auth, username, password);
      Alert.alert('Success', `Logged in as ${username}`);
      setLoggedIn(true); // Successfully logged in
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the FeedScreen once logged in
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('Feed'); // Navigate to Feed screen after successful login
    }
  }, [loggedIn, navigation]);

  // Navigation handlers for sign-up and forgot password
  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUp screen
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to ForgotPassword screen
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
