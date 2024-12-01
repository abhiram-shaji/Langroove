import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../firebase';
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Import Firestore Timestamp

// Define the Topic type
interface Topic {
  id: string;
  createdAt: Timestamp | null; // Allow null for pending server timestamps
  description: string;
  ownerId: string;
  ownerName: string;
}

export const useFeed = () => {
  const [topics, setTopics] = useState<Topic[]>([]); // Use the Topic type
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null); // Store the unsubscribe function

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Load topics from cache first
    const loadCachedTopics = async () => {
      try {
        const cachedTopics = await AsyncStorage.getItem('cachedTopics');
        if (cachedTopics) {
          setTopics(JSON.parse(cachedTopics));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading cached topics:', error);
      }
    };

    // Function to fetch topics from Firestore and update cache
    const fetchTopicsFromFirestore = () => {
      const topicsCollection = collection(db, 'topics');

      // Set up the snapshot listener and store the unsubscribe function
      const unsubscribe = onSnapshot(
        topicsCollection,
        (snapshot) => {
          const topicsData: Topic[] = snapshot.docs
            .map((doc: QueryDocumentSnapshot<DocumentData>) => {
              const data = doc.data();
              return {
                id: doc.id,
                createdAt: data.createdAt || null, // Handle null values for pending server timestamps
                description: data.description,
                ownerId: data.ownerId,
                ownerName: data.ownerName,
              } as Topic;
            })
            .sort((a, b) => {
              // Handle sorting with potential null values
              const timeA = a.createdAt ? a.createdAt.toMillis() : 0; // Treat null as the oldest
              const timeB = b.createdAt ? b.createdAt.toMillis() : 0;
              return timeB - timeA; // Sort by descending time
            });

          setTopics(topicsData);

          // Cache the topics data
          AsyncStorage.setItem('cachedTopics', JSON.stringify(topicsData)).catch((error) =>
            console.error('Error caching topics:', error)
          );

          setLoading(false);
        },
        (error) => {
          console.error('Error fetching real-time topics:', error);
          setLoading(false);
        }
      );

      unsubscribeRef.current = unsubscribe; // Store unsubscribe function
    };

    loadCachedTopics(); // Load from cache on mount
    fetchTopicsFromFirestore(); // Then fetch and update in real-time from Firestore

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current(); // Clean up the listener on unmount
      }
    };
  }, []);

  return { topics, loading, unsubscribeRef }; // Return the unsubscribeRef
};
