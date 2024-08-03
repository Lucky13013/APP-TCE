import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFirstAccess = () => {
  const [isFirstAccess, setIsFirstAccess] = useState(false);

  useEffect(() => {
    const checkFirstAccess = async () => {
      try {
        const hasVisited = await AsyncStorage.getItem('hasVisited');

        if (hasVisited === null) {
          setIsFirstAccess(true);
          await AsyncStorage.setItem('hasVisited', 'true');
        } else {
          setIsFirstAccess(false);
        }
      } catch (error) {
        console.error('Error checking first access:', error);
      }
    };

    checkFirstAccess();
  }, []);

  return isFirstAccess;
};

export default useFirstAccess;