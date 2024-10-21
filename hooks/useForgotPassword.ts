// /hooks/useForgotPassword.ts

import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App'; 


export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleResetPassword = () => {
    // Here you can add logic to handle password reset (e.g., API call)
    console.log(`Password reset link sent to ${email}`);
  };

  const navigateLogin = () => {
    navigation.navigate('Login'); // Navigate to SignUp screen
  };

  return { email, setEmail, handleResetPassword, navigateLogin };
};
