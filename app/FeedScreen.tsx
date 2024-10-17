import React from 'react';
import { ScrollView, View, Text } from 'react-native';  // Make sure Text is imported
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
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              onPress={() => handleTopicPress(topic.title)}
            />
          ))
        ) : (
          <Text>No topics available.</Text> 
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;
