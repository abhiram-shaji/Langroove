// useCurrentScreen.ts
import { useRoute } from '@react-navigation/native';

export const useCurrentScreen = () => {
  const route = useRoute();
  return route.name; // Returns the name of the currently active screen
};
