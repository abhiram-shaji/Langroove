// /components/TopicCard.tsx

import React from 'react';
import { Card, Avatar } from 'react-native-paper';
import { topicCardStyles } from '../styles/FeedScreenStyles';
import useUserInfo from '../hooks/useUserInfo'; // Import the existing hook

interface TopicCardProps {
  description: string;
  ownerName: string;
  ownerId: string;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ description, ownerName, ownerId, onPress }) => {
  const { userInfo, loading } = useUserInfo(ownerId); // Use the custom hook

  return (
    <Card style={topicCardStyles.card} onPress={onPress}>
      <Card.Title
        title={description}
        subtitle={`Owner: ${ownerName}`}
        left={() => (
          <Avatar.Image
            size={40}
            source={{ uri: loading ? 'https://robohash.org/default-avatar.png' : userInfo.avatar }}
          />
        )}
      />
    </Card>
  );
};

export default TopicCard;
