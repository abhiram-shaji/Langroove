import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase'; // Correctly import the Firestore instance
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods for setting data
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';

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

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

      if (userCredential.user) {
        const { uid } = userCredential.user;

        // Update the user's profile with the display name
        await updateProfile(userCredential.user, { displayName: name });

        // Generate a consistent RoboHash avatar URL based on the user's UID
        const avatarUrl = `https://robohash.org/${uid}.png`;

        // Store the user's name and avatar in Firestore
        await setDoc(doc(db, 'users', uid), {
          name,
          email,
          avatar: avatarUrl,
        });

        console.log('Sign-up successful for:', email);

        // Navigate to the login screen
        navigation.replace('Login');
      }

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
