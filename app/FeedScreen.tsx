// /screens/FeedScreen.tsx

import React from 'react';
import { ScrollView, View } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import TopicCard from '../components/TopicCard';
import BottomNavBar from '../components/BottomNavBar';  // Import the BottomNavBar
import { feedScreenStyles } from '../styles/FeedScreenStyles';

const FeedScreen: React.FC = () => {
  const { topics, handleTopicPress } = useFeed();

  return (
    <View style={feedScreenStyles.container}>
      {/* Scrollable Content for Topic Cards */}
      <ScrollView contentContainerStyle={feedScreenStyles.scrollContainer}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            onPress={() => handleTopicPress(topic.title)}
          />
        ))}
      </ScrollView>

    </View>
  );
};

export default FeedScreen;
