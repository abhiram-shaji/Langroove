// /hooks/useForgotPassword.ts

import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase auth functions
import { auth } from '../firebase'; // Import the Firebase auth instance

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleResetPassword = () => {
    if (email.trim()) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log(`Password reset link sent to ${email}`);
          // Optionally, you can navigate to another screen after the email is sent
          navigation.navigate('Login'); // Navigate to Login screen after successful reset request
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error.message);
          // Handle specific errors (e.g., invalid email)
          alert('Error sending password reset email. Please try again.');
        });
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const navigateLogin = () => {
    navigation.navigate('Login'); // Navigate to Login screen
  };

  return { email, setEmail, handleResetPassword, navigateLogin };
};
