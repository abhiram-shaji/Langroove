// /components/TopicCard.tsx

import React, { useState } from 'react';
import { Card, Avatar } from 'react-native-paper';
import { topicCardStyles } from '../styles/FeedScreenStyles';

// Helper function to generate a random string
const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

interface TopicCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, description, onPress }) => {
  // Generate a random avatar URI for each TopicCard
  const randomAvatarUri = `https://robohash.org/${generateRandomString(10)}.png`;

  return (
    <Card style={topicCardStyles.card} onPress={onPress}>
      <Card.Title
        title={title}
        subtitle={description}
        left={(props) => <Avatar.Image {...props} size={40} source={{ uri: randomAvatarUri }} />}
      />
    </Card>
  );
};

export default TopicCard;
