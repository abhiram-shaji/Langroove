import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import TopicCard from '../components/TopicCard';
import { feedScreenStyles } from '../styles/FeedScreenStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { StackScreenProps } from '@react-navigation/stack'; // Import StackScreenProps
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useHeader from '../hooks/useHeader';

// Define FeedScreen's props using StackScreenProps
type FeedScreenProps = StackScreenProps<RootStackParamList, 'Feed'>;

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation }) => {
  const { topics } = useFeed();
  const { userInfo, isUserLoading, userInfoLoading } = useHeader();

  const handleAddTopicPress = () => {
    navigation.navigate('AddTopic');
  };

  const handleTopicPress = (ownerId: string) => {
    navigation.navigate('Profile', { ownerId });
  };

  return (
    <View style={feedScreenStyles.container}>
      <View style={feedScreenStyles.topBar}>
        {isUserLoading || userInfoLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={feedScreenStyles.welcomeText}>
            Welcome, {userInfo?.name || 'Guest'}
          </Text>
        )}
      </View>
      <ScrollView contentContainerStyle={feedScreenStyles.scrollContainer}>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              description={topic.description}
              ownerName={topic.ownerName}
              ownerId={topic.ownerId}
              onPress={() => handleTopicPress(topic.ownerId)}
            />
          ))
        ) : (
          <Text>No topics available.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={feedScreenStyles.addButton} onPress={handleAddTopicPress}>
      <MaterialIcons name="post-add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedScreen;
