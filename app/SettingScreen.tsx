// /screens/SettingsScreen.tsx

import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsButton from '../components/SettingsButton';
import { styles } from '../styles/SettingsScreenStyles';
import BottomNavBar from '../components/BottomNavBar';  // Import the BottomNavBar
import { useLogout } from '../hooks/useLogout'; // Import the useLogout hook

const SettingsScreen: React.FC = () => {
  const { handleLogout } = useLogout(); // Destructure the handleLogout function

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Profile Button */}
        <SettingsButton 
          title="Profile" 
          onPress={() => console.log('Profile pressed')} 
        />

        {/* Privacy Button */}
        <SettingsButton 
          title="Privacy" 
          onPress={() => console.log('Privacy pressed')} 
        />

        {/* About Button */}
        <SettingsButton 
          title="About" 
          onPress={() => console.log('About pressed')} 
        />

        {/* Logout Button */}
        <SettingsButton 
          title="Logout" 
          onPress={handleLogout} // Call the logout function
        />
        
      </View>
      <BottomNavBar />
      </SafeAreaProvider>
  );
};

export default SettingsScreen;
