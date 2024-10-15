// _layout.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import LoginScreen from './LoginScreen';
import { colors } from '../styles/themes';
import AppTabs from './navigation/AppTabs';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (isLoggedIn === null) {
    return <AuthLoadingScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return <AppTabs />;
}
