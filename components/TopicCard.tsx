// /components/TopicCard.tsx

import React from 'react';
import { Card, Avatar, Text } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { topicCardStyles } from '../styles/FeedScreenStyles';
import useUserInfo from '../hooks/useUserInfo';

interface TopicCardProps {
  description: string;
  ownerName: string;
  ownerId: string;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ description, ownerName, ownerId, onPress }) => {
  const { userInfo, loading } = useUserInfo(ownerId);

  return (
    <Card style={topicCardStyles.card}>
      <Card.Title
        title={<Text style={topicCardStyles.ownerNameText}>{ownerName}</Text>}
        left={() => (
          <Avatar.Image
            size={40}
            source={{ uri: loading ? 'https://robohash.org/default-avatar.png' : userInfo.avatar }}
          />
        )}
        right={() => (
          <TouchableOpacity onPress={onPress} style={topicCardStyles.viewProfileButton}>
            <Text style={topicCardStyles.viewProfileButtonText}>View Profile</Text>
          </TouchableOpacity>
        )}
      />
      <Card.Content>
        <View>
          {/* Allow the text to wrap naturally */}
          <Text style={topicCardStyles.description}>{description}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default TopicCard;
