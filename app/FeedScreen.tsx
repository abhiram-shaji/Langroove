import React from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import TopicCard from '../components/TopicCard';
import BottomNavBar from '../components/BottomNavBar';
import { feedScreenStyles } from '../styles/FeedScreenStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../app/App'; // Adjust the path if necessary

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { topics } = useFeed();

  const handleAddTopicPress = () => {
    navigation.navigate('AddTopic');
  };

  const handleTopicPress = (topicDescription: string) => {
    // Adjust as needed for handling topic press with description
  };

  return (
    <View style={feedScreenStyles.container}>
      {/* Scrollable Content for Topic Cards */}
      <ScrollView contentContainerStyle={feedScreenStyles.scrollContainer}>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              description={topic.description} // Only using the description now
              ownerName={topic.ownerName}
              onPress={() => handleTopicPress(topic.description)} // Adjusted to pass description
            />
          ))
        ) : (
          <Text>No topics available.</Text>
        )}
      </ScrollView>

      {/* Button to Add Topic */}
      <Button title="Add Topic" onPress={handleAddTopicPress} />

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;
