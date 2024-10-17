import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation
import { useFeed } from '../hooks/useFeed';
import TopicCard from '../components/TopicCard';
import BottomNavBar from '../components/BottomNavBar';  // Import the BottomNavBar
import { feedScreenStyles } from '../styles/FeedScreenStyles';

const FeedScreen: React.FC = () => {
  const { topics, handleTopicPress } = useFeed();
  const navigation = useNavigation();  // Get the navigation object

  return (
    <View style={feedScreenStyles.container}>
      {/* Scrollable Content for Topic Cards */}
      <ScrollView contentContainerStyle={feedScreenStyles.scrollContainer}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            onPress={() => handleTopicPress(topic.title)}  // Handle topic press
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;
