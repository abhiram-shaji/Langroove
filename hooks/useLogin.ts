import { useState, useEffect } from 'react'; // Import useEffect
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth from your firebase setup

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
  const [loggedIn, setLoggedIn] = useState(false);  // Track login success state
  const router = useRouter();

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
      Alert.alert('Success', `Logged in as ${username}`);
      setLoggedIn(true);  // Set login success state to true
    } catch (error: any) {
      // Handle Firebase authentication errors
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to navigate after login success
  useEffect(() => {
    if (loggedIn) {
      router.push('/FeedScreen');  // Navigate only after login success is set
    }
  }, [loggedIn, router]);  // Corrected useEffect dependency list

  const navigateToSignUp = () => {
    router.push('/SignUpScreen');
  };

  const navigateToForgotPassword = () => {
    router.push('/ForgotPasswordScreen');
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
