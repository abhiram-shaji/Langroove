// /screens/FeedScreen.tsx

import React from 'react';
import { ScrollView, View } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import FeedHeader from '../components/FeedHeader';
import TopicCard from '../components/TopicCard';
import { feedScreenStyles } from '../styles/FeedScreenStyles';

const FeedScreen: React.FC = () => {
  const { topics, handleTopicPress } = useFeed();

  return (
    <View style={feedScreenStyles.container}>
      {/* Header - empty for now*/}
  

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
