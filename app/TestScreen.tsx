import React from 'react';
import { View, Button } from 'react-native';
import TestScreenStyles from '../styles/TestScreenStyles';
import { useTest } from '../hooks/useTest'; 

const ButtonScreen: React.FC = () => {
  const { handlePress } = useTest();

  return (
    <View style={TestScreenStyles.container}>
      <Button title="Press me" onPress={handlePress} />
    </View>
  );
};

export default ButtonScreen;