import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { Slot } from 'expo-router';  // Import Slot for routing
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
    return <AuthLoadingScreen />;  // Show loading indicator while auth state is being checked
  }

  if (!isLoggedIn) {
    return <Slot initialRouteName="/LoginScreen" />;  // Render the login screen
  }

  return <Slot initialRouteName="/AppTabs" />;  // Render the main app tabs when logged in
}
