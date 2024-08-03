import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FavoriteStar = ({ articleId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const checkFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }

      const response = await axios.get('http://192.168.1.13:8000/api/list-favorites/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error('Unauthorized: Check your token');
        return;
      }

      const data = response.data;
      if (data.favorites.includes(articleId)) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate("Login")
        return;
      }

      const response = await axios.post(`http://192.168.1.13:8000/api/toggle-favorite/${articleId}/`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error('Unauthorized: Check your token');
        
        return;
      }

      const data = response.data;
      console.log(data.message);
      setIsFavorite((prevState) => !prevState);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [articleId]);

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={30} color={isFavorite ? '#e06eaa' : '#999'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  starIcon: {
    padding: 10,
  },
});

export default FavoriteStar;