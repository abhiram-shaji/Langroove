import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import useUserInfo from './useUserInfo';

const useHeader = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
      setIsUserLoading(false); // Stop loading after user is fetched
    });

    return () => unsubscribe();
  }, []);

  const { userInfo, loading: userInfoLoading } = useUserInfo(userId || '');

  return {
    userId,
    isUserLoading,
    userInfo,
    userInfoLoading,
  };
};

export default useHeader;
