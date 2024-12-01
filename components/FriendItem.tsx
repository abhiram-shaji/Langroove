import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Divider, Avatar } from 'react-native-paper'; // Correctly import Avatar
import { styles } from '../styles/FriendListStyles'; // Import your styles

interface FriendItemProps {
  id: string;
  name: string;
  avatar: string;
  onPress: () => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, avatar, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {avatar ? (
          <Avatar.Image size={48} source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} /> // Placeholder for missing avatar
        )}
        <Text style={styles.name}>{name}</Text>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default FriendItem;
