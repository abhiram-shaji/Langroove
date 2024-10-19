import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

const ButtonScreen: React.FC = () => {
  const handlePress = () => {
    console.log('Hello');
  };

  return (
    <View style={styles.container}>
      <Button title="Press me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonScreen;
