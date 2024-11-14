import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';
import useFirebaseAuthErrors from '../hooks/useFirebaseAuthErrors';

interface Credentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export const useSignUp = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { getErrorMessage } = useFirebaseAuthErrors();

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });

    // Clear specific field error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));

    if (field === 'email') {
      checkEmailExists(value);
    }
  };

  const checkEmailExists = async (email: string) => {
    if (!email) return;
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(emailQuery);
    setEmailExists(!querySnapshot.empty);

    if (!querySnapshot.empty) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'This email is already registered.' }));
    }
  };

  const handleSignUp = async () => {
    const { name, email, password, confirmPassword } = credentials;
    const newErrors: Errors = {};

    if (!name) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        const { uid } = userCredential.user;
        await updateProfile(userCredential.user, { displayName: name });
        const avatarUrl = `https://robohash.org/${uid}.png`;

        // Save user details in Firestore
        await setDoc(doc(db, 'users', uid), { name, email, avatar: avatarUrl });

        // Send verification email
        await sendEmailVerification(userCredential.user);

        console.log('Verification email sent to:', email);

        // Redirect to WaitingForVerification screen
        navigation.replace('WaitingForVerification');
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setErrors((prevErrors) => ({ ...prevErrors, general: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    errors,
    loading,
    emailExists,
    handleInputChange,
    handleSignUp,
  };
};
