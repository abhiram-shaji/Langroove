import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firestore database as db
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

export const useFeed = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch topics from Firestore
  const fetchTopics = async () => {
    try {
      const topicsCollection = collection(db, 'topics'); // Adjust collection name if necessary
      const topicsSnapshot = await getDocs(topicsCollection);
      const topicsData = topicsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topicsData);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []); // Empty dependency array ensures the data is fetched only once when the component mounts

  // Function to handle pressing a topic (if needed)
  const handleTopicPress = (description: string) => {
    console.log(`Tapped on ${description}`);
  };

  return { topics, handleTopicPress, loading };
};
