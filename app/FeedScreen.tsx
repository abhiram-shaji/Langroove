import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
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

  // Updated to navigate to the profile screen when the topic is pressed
  const handleTopicPress = (ownerId: string) => {
    navigation.navigate('Profile', { ownerId });
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
              ownerId={topic.ownerId} // Add this line
              onPress={() => handleTopicPress(topic.ownerId)} // Passing ownerId to navigate
            />
          ))
        ) : (
          <Text>No topics available.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={feedScreenStyles.addButton}
        onPress={handleAddTopicPress}
      >
        <Text style={feedScreenStyles.addButtonText}>Add Topic</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;
