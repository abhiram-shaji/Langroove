// /hooks/useSignUp.ts
import { useState } from 'react';

interface Credentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleSignUp = () => {
    const { name, email, password, confirmPassword } = credentials;

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      console.log('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }

    // Handle actual sign-up logic here (e.g., API request)
    console.log('Sign up successful for:', email);
  };

  return {
    credentials,
    handleInputChange,
    handleSignUp,
  };
};
