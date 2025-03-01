import { useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import useFirebaseAuthErrors from './useFirebaseAuthErrors';

interface Credentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Single error message

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { getErrorMessage } = useFirebaseAuthErrors();

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const validateFields = (): boolean => {
    if (!credentials.email || !credentials.password) {
      setError('Email and password should not be empty');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;
  
    setLoading(true);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // If the email is not verified, send a verification email and navigate to WaitingForVerification screen
        await sendEmailVerification(user);
        setError('Email not verified. Please check your email and verify your account.');
        
        // Using reset instead of replace to clear navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'WaitingForVerification' }],
        });
        return; // Stop further login process
      }

      // After successful login and email verification, Firebase will automatically manage the user session
      navigation.navigate('TabScreens', { screen: 'Feed' }); // Navigate to Feed within TabScreens after login
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage); // Set the general error message
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return {
    credentials,
    loading,
    error, // return single error message for UI
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
  };
};
