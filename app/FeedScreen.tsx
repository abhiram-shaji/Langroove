import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import useUserInfo from '../hooks/useUserInfo';
import TopicCard from '../components/TopicCard';
import BottomNavBar from '../components/BottomNavBar';
import { feedScreenStyles } from '../styles/FeedScreenStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { topics } = useFeed();
  const [userId, setUserId] = useState<string | null>(null); // State to hold userId

  // Fetch current userId from Firebase Auth
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid); // Set the userId from current user
    } else {
      console.log('No user is logged in');
    }
  }, []);

  const { userInfo, loading } = useUserInfo(userId || ''); // Fetch user info using the hook

  const handleAddTopicPress = () => {
    navigation.navigate('AddTopic');
  };

  const handleTopicPress = (ownerId: string) => {
    navigation.navigate('Profile', { ownerId });
  };

  return (
    <View style={feedScreenStyles.container}>
      {/* Top Bar with Welcome Text */}
      <View style={feedScreenStyles.topBar}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={feedScreenStyles.welcomeText}>
            Welcome, {userInfo.name || 'Guest'}
          </Text>
        )}
      </View>

      {/* Scrollable Content for Topic Cards */}
      <ScrollView contentContainerStyle={feedScreenStyles.scrollContainer}>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              description={topic.description}
              ownerName={topic.ownerName}
              ownerId={topic.ownerId}
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
        <Ionicons name="add-circle" size={60} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;
