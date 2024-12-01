import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, startAfter, getDocs, onSnapshot, DocumentSnapshot } from 'firebase/firestore';

const PAGE_SIZE = 10; // Number of topics to fetch per page

export const useFeed = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const unsubscribeRef = useRef<(() => void) | null>(null); // Properly typed useRef

  const fetchTopics = async (loadMore = false) => {
    setLoading(true);
    try {
      const topicsCollection = collection(db, 'topics');
      const topicsQuery = query(
        topicsCollection,
        orderBy('createdAt', 'desc'),
        ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(topicsQuery);

      const newTopics = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTopics((prev) => (loadMore ? [...prev, ...newTopics] : newTopics));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeUpdates = () => {
    const topicsCollection = collection(db, 'topics');
    const realTimeQuery = query(topicsCollection, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

    const unsubscribe = onSnapshot(realTimeQuery, (snapshot) => {
      const realTimeTopics = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTopics((prev) => {
        const existingIds = new Set(prev.map((topic) => topic.id));
        const newTopics = realTimeTopics.filter((topic) => !existingIds.has(topic.id));
        return [...newTopics, ...prev];
      });
    });

    unsubscribeRef.current = unsubscribe; // Assign unsubscribe function
  };

  useEffect(() => {
    fetchTopics();
    setupRealTimeUpdates();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current(); // Cleanup listener
      }
    };
  }, []);

  return { topics, loading, fetchMore: () => fetchTopics(true), hasMore };
};
