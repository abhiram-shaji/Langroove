// login.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import LoginUI from './loginUi';

interface Credentials {
  username: string;
  password: string;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      Alert.alert('Error', 'Please fill out both fields');
    } else {
      Alert.alert('Success', `Logged in as ${username}`);
    }
  };

  return (
    <LoginUI 
      credentials={credentials}
      handleInputChange={handleInputChange}
      handleLogin={handleLogin}
      onSignUp={() => router.push('/signup')}
    />
  );
}