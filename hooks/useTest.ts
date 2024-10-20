// useTest.ts

import { useCallback } from 'react';

export const useTest = () => {
  const handlePress = useCallback(() => {
    console.log('Hello');
  }, []);

  return {
    handlePress,
  };
};
