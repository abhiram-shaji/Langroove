import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Firebase auth methods
import { auth } from '../firebase'; // Assuming firebase is correctly configured in firebase.ts

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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleSignUp = async () => {
    const { name, email, password, confirmPassword } = credentials;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Firebase sign-up method
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's profile with the display name (name)
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      console.log('Sign-up successful for:', email);

      // After successful sign-up, navigate to the login screen
      router.replace('/LoginScreen'); // Replace the current screen with the login screen in Expo Router

    } catch (error: any) {
      setError(error.message);
      console.log('Sign-up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    error,
    loading,
    handleInputChange,
    handleSignUp,
  };
};
