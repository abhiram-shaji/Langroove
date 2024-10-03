// /components/TopicCard.tsx

import React from 'react';
import { Card, Avatar } from 'react-native-paper';
import { topicCardStyles } from '../app/styles/FeedScreenStyles';

interface TopicCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, description, onPress }) => {
  return (
    <Card style={topicCardStyles.card} onPress={onPress}>
      <Card.Title
        title={title}
        subtitle={description}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
      />
    </Card>
  );
};

export default TopicCard;
