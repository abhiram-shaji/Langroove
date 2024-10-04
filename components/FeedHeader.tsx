// /components/FeedHeader.tsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/themes'; // Adjust path if necessary
import { headerStyles } from '../styles/FeedScreenStyles';

const FeedHeader: React.FC = () => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity style={headerStyles.iconButton}>
        <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={headerStyles.title}>Feed</Text>
      <TouchableOpacity style={headerStyles.iconButton}>
        <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default FeedHeader;
