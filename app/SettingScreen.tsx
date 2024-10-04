// /screens/SettingsScreen.tsx

import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsButton from '../components/SettingsButton';
import { styles } from '../styles/SettingsScreenStyles';

const SettingsScreen: React.FC = () => {
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
          onPress={() => console.log('Logout pressed')} 
        />
        
        {/* Delete Profile Button */}
        <SettingsButton 
          title="Delete Profile" 
          onPress={() => console.log('Delete Profile pressed')} 
        />
      </View>
    </SafeAreaProvider>
  );
};

export default SettingsScreen;
