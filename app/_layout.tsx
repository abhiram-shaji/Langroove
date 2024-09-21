// _layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Apply globally to all screens, hides the header
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}  // Header is hidden already
      />
      <Stack.Screen
        name="sign"
        options={{ title: 'Sign Up' }}  // Header is hidden already
      />
      <Stack.Screen
        name="forgot"
        options={{ title: 'Forgot Password' }}  // Header is hidden already
      />
      <Stack.Screen
        name="feed"
        options={{ title: 'Topic Feed' }}  // Header is hidden already
      />
    </Stack>
  );
}
