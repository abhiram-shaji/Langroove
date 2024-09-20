// signup.tsx

import React, { useState } from 'react';
import SignUpUI from './signupUi';  // Import the UI component

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log('Sign Up clicked');
  };

  return (
    <SignUpUI
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSignUp={handleSignUp}
    />
  );
}
