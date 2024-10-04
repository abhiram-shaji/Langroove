// /app/screens/login.tsx

import React from 'react';
import LoginUI from '../components/LoginUI';
import { useLogin } from '../hooks/useLogin'; // Import the custom hook

export default function Login() {
  // Use the custom hook to get all the login logic
  const {
    credentials,
    handleInputChange,
    handleLogin,
    navigateToSignUp,
    navigateToForgotPassword,
  } = useLogin();

  return (
    <LoginUI
      credentials={credentials}
      handleInputChange={handleInputChange}
      handleLogin={handleLogin}
      onSignUp={navigateToSignUp}
      onForgotPassword={navigateToForgotPassword}
    />
  );
}
