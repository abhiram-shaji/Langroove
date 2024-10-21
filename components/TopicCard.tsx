// /components/TopicCard.tsx

import React from 'react';
import { Card, Avatar, Text } from 'react-native-paper';
import { View } from 'react-native';
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
    <Card style={topicCardStyles.card} onPress={onPress}>
      <Card.Title
        title={ownerName}
        left={() => (
          <Avatar.Image
            size={40}
            source={{ uri: loading ? 'https://robohash.org/default-avatar.png' : userInfo.avatar }}
          />
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
