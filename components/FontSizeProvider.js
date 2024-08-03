import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSizes, setFontSizes] = useState({
    fontSizeTexto: 16,
    fontSizeTitulo: 20,
  });

  useEffect(() => {
    const loadFontSizes = async () => {
      try {
        const savedFontSizes = await AsyncStorage.getItem('fontSizes');
        if (savedFontSizes) {
          setFontSizes(JSON.parse(savedFontSizes));
        }
      } catch (e) {
        console.error('Failed to load font sizes from AsyncStorage', e);
      }
    };

    loadFontSizes();
  }, []);

  const updateFontSizes = async (newFontSizes) => {
    try {
      setFontSizes(newFontSizes);
      await AsyncStorage.setItem('fontSizes', JSON.stringify(newFontSizes));
    } catch (e) {
      console.error('Failed to save font sizes to AsyncStorage', e);
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSizes, updateFontSizes }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  return useContext(FontSizeContext);
};