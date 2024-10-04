import { useRouter } from 'expo-router';

// Define a union of valid routes
type Route = 
  | '/FeedScreen'
  | '/ChatListScreen'
  | '/SettingScreen'
  | '/LoginScreen'
  | '/SignUpScreen'
  | '/ForgotPasswordScreen'
  | '/ProfileScreen'
  | '/FriendListScreen';

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (screen: Route) => {
    router.push(screen); // Type-safe route navigation
  };

  return { navigateTo };
};
