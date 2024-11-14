// useEmailVerification.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { onAuthStateChanged, reload, sendEmailVerification, User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';
import { auth } from '../firebase';

export const useEmailVerification = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WaitingForVerification'>>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.emailVerified) {
        navigation.replace('TabScreens', { screen: 'Feed' }); // Navigate to Feed within TabScreens
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);
  

  const checkVerificationStatus = async () => {
    if (user) {
      setLoading(true);
      try {
        await reload(user);
        const updatedUser = auth.currentUser;
        setUser(updatedUser);
        if (updatedUser?.emailVerified) {
          navigation.replace('TabScreens', { screen: 'Feed' }); // Navigate to Feed within TabScreens
        }
      } catch (error) {
        console.error('Error reloading user:', error);
        Alert.alert('Error', 'Could not refresh verification status. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleResendVerification = () => {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          Alert.alert(
            'Verification Email Sent',
            'A new verification email has been sent to your email address.'
          );
        })
        .catch((error) => {
          console.error('Error sending verification email:', error);
          Alert.alert('Error', 'Failed to send verification email. Please try again later.');
        });
    }
  };

  return { loading, user, checkVerificationStatus, handleResendVerification };
};
