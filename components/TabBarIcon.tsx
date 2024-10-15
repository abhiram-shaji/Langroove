// components/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  routeName: string;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ routeName, color, size }) => {
  let iconName: 'home-outline' | 'chatbubble-outline' | 'settings-outline';

  switch (routeName) {
    case 'FeedScreen':
      iconName = 'home-outline';
      break;
    case 'ChatListScreen':
      iconName = 'chatbubble-outline';
      break;
    case 'SettingScreen':
      iconName = 'settings-outline';
      break;
    default:
      iconName = 'home-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
