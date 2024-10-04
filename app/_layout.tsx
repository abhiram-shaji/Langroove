import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import SettingScreen from './SettingScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/themes'; // Assuming this is where your colors are defined

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Initialize iconName with a default value
          let iconName: 'home-outline' | 'chatbubble-outline' | 'settings-outline' = 'home-outline';

          // Update iconName based on the route name
          if (route.name === 'FeedScreen') {
            iconName = 'home-outline';
          } else if (route.name === 'ChatListScreen') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'SettingScreen') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header for all screens
      })}
    >
      <Tab.Screen name="FeedScreen" component={FeedScreen} />
      <Tab.Screen name="ChatListScreen" component={ChatListScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}
