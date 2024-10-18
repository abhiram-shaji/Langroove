import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'react-native-paper';
import { topicCardStyles } from '../styles/FeedScreenStyles';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface TopicCardProps {
  description: string;
  ownerName: string;
  ownerId: string;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ description, ownerName, ownerId, onPress }) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    fetchUserAvatar();
  }, [ownerId]);

  const fetchUserAvatar = async () => {
    try {
      if (ownerId) {
        console.log('Fetching avatar for ownerId:', ownerId);
        const userDoc = await getDoc(doc(db, 'users', ownerId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('Fetched user data:', userData);
          setAvatarUri(userData?.avatar || 'https://robohash.org/default-avatar.png');
        } else {
          console.log(`No user found with ID: ${ownerId}`);
        }
      } else {
        console.log('ownerId is undefined or null');
      }
    } catch (error) {
      console.log('Error fetching owner avatar:', error);
    }
  };

  return (
    <Card style={topicCardStyles.card} onPress={onPress}>
      <Card.Title
        title={description}
        subtitle={`Owner: ${ownerName}`}
        left={() => (
          <Avatar.Image
            size={40}
            source={{ uri: avatarUri || 'https://robohash.org/default-avatar.png' }}
          />
        )}
      />
    </Card>
  );
};

export default TopicCard;
