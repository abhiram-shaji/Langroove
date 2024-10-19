import React from 'react';
import { View, Button } from 'react-native';
import TestScreenStyles from '../styles/TestScreenStyles'; // Import the new styles

const ButtonScreen: React.FC = () => {
  const handlePress = () => {
    console.log('Hello');
  };

  return (
    <View style={TestScreenStyles.container}>
      <Button title="Press me" onPress={handlePress} />
    </View>
  );
};

export default ButtonScreen;
