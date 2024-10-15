// components/AuthLoadingScreen.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../styles/themes';

const AuthLoadingScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default AuthLoadingScreen;
