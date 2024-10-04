// /components/FriendItem.tsx

import React from 'react';
import { View } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';

interface FriendItemProps {
  id: string;
  name: string;
  avatar: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, avatar }) => {
  return (
    <View>
      <List.Item
        title={name}
        left={() => <Avatar.Image size={48} source={{ uri: avatar }} />}
      />
      <Divider />
    </View>
  );
};

export default FriendItem;
