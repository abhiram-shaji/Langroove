// /components/FriendItem.tsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';

interface FriendItemProps {
  id: string;
  name: string;
  avatar: string;
  onPress: () => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, avatar, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <List.Item
          title={name}
          left={() => <Avatar.Image size={48} source={{ uri: avatar }} />}
        />
        <Divider />
      </View>
    </TouchableOpacity>
  );
};

export default FriendItem;
