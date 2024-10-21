import { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Import Firestore database and Firebase auth
import { collection, onSnapshot, query, where } from 'firebase/firestore'; // Import Firestore real-time methods

export const useFeed = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser; // Get the currently logged-in user

    if (!currentUser) return; // Ensure the user is logged in

    const topicsCollection = collection(db, 'topics'); // Adjust collection name if necessary

    // Filter topics where ownerId is not equal to the logged-in user's ID
    const topicsQuery = query(topicsCollection, where('ownerId', '!=', currentUser.uid));

    // Use onSnapshot to get real-time updates
    const unsubscribe = onSnapshot(topicsQuery, (snapshot) => {
      const topicsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topicsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching real-time topics:', error);
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the data is fetched only once when the component mounts

  // Function to handle pressing a topic (if needed)
  const handleTopicPress = (description: string) => {
    console.log(`Tapped on ${description}`);
  };

  return { topics, handleTopicPress, loading };
};
