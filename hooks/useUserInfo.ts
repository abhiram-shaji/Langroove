// /hooks/useUserInfo.ts

import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserInfo {
  name: string;
  avatar?: string;
  bio?: string;
  nativeLanguages?: string[];
  fluentLanguages?: string[];
  learningLanguages?: string[];
}

const useUserInfo = (userId: string) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '' });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserInfo({
              name: userData?.name || '',
              avatar: userData?.avatar || 'https://robohash.org/default-avatar.png',
              bio: userData?.bio || '',
              nativeLanguages: userData?.nativeLanguages || [],
              fluentLanguages: userData?.fluentLanguages || [],
              learningLanguages: userData?.learningLanguages || [],
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return { userInfo, loading };
};

export default useUserInfo;
