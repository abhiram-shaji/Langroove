import React from 'react';
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';

const App = () => {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
};

export default App;

// Register the component with Expo
registerRootComponent(App);
