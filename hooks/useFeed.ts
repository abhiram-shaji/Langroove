import { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore'; 

export const useFeed = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null); // Store the unsubscribe function

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const topicsCollection = collection(db, 'topics');

    // Set up the snapshot listener and store the unsubscribe function
    const unsubscribe = onSnapshot(
      topicsCollection,
      (snapshot) => {
        const topicsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopics(topicsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching real-time topics:', error);
        setLoading(false);
      }
    );

    unsubscribeRef.current = unsubscribe; // Store unsubscribe function

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current(); // Clean up the listener on unmount
      }
    };
  }, []);

  return { topics, loading, unsubscribeRef }; // Return the unsubscribeRef
};
