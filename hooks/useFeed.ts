// /hooks/useFeed.ts

import { useState } from 'react';

// Dummy data for topics
const initialTopics = [
  { id: 1, title: 'James', description: 'Suggest me some workouts' },
  { id: 2, title: 'Kevin', description: 'How is your morning?' },
  { id: 3, title: 'Lisa', description: 'Plans for the day?' },
];

export const useFeed = () => {
  const [topics, setTopics] = useState(initialTopics);

  // Add your logic here, such as fetching data, handling taps, etc.
  const handleTopicPress = (title: string) => {
    console.log(`Tapped on ${title}`);
  };

  return { topics, handleTopicPress };
};
