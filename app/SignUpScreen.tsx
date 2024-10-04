import React from 'react';
import SignUpUI from '../components/SignUpUI';
import { useSignUp } from '../hooks/useSignUp';

const SignUpScreen: React.FC = () => {
  const { credentials, handleInputChange, handleSignUp } = useSignUp();

  return (
    <SignUpUI
      credentials={credentials}
      handleInputChange={handleInputChange}
      handleSignUp={handleSignUp}
    />
  );
};

export default SignUpScreen;
