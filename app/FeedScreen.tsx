import React, { useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import TopicCard from '../components/TopicCard';
import { feedScreenStyles } from '../styles/FeedScreenStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useHeader from '../hooks/useHeader';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';

type FeedScreenProps = StackScreenProps<RootStackParamList, 'Feed'>;

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation }) => {
  const { topics, loading, fetchMore, hasMore } = useFeed();
  const { userInfo, isUserLoading, userInfoLoading } = useHeader();

  const handleAddTopicPress = () => {
    navigation.navigate('AddTopic');
  };

  const handleTopicPress = (ownerId: string) => {
    navigation.navigate('Profile', { ownerId });
  };

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && hasMore && !loading) {
        fetchMore();
      }
    },
    [fetchMore, hasMore, loading]
  );

  return (
    <View style={feedScreenStyles.container}>
      
      <ScrollView
        contentContainerStyle={feedScreenStyles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={feedScreenStyles.topBar}>
        {isUserLoading || userInfoLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={feedScreenStyles.welcomeText}>
            Welcome, {userInfo?.name || 'Guest'}
          </Text>
        )}
      </View>
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
        {loading && <ActivityIndicator size="large" color="#004643" />}
      </ScrollView>
      <TouchableOpacity style={feedScreenStyles.addButton} onPress={handleAddTopicPress}>
        <MaterialIcons name="post-add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedScreen;
