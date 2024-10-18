// /components/ProfileInfo.tsx

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileScreenStyles';
import { auth, db } from '../firebase'; // Ensure you're importing Firebase properly
import { doc, getDoc } from 'firebase/firestore';

const ProfileInfo: React.FC = () => {
  const [name, setName] = useState<string>(''); // State to store user's name
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch the user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData?.name || ''); // Set the name if it exists in Firestore
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchUserName();
  }, []);

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name ? name : 'User'}</Text>
    </View>
  );
};

export default ProfileInfo;
