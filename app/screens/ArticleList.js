import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FavoriteStar from '../../components/ToggleFavorite';
import { useTranslation } from 'react-i18next';

export default function ArticleList({ route }) {
  const { fromDate, untilDate } = route.params;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const idioma = i18n.language;

  const parseJson = (jsonString) => {
    try {
      return JSON.parse(jsonString.replace(/\\/g, '').replace(/'/g, '"'));
    } catch (e) {
      
      return null;
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://192.168.1.13:8000/api/artigos_por_ano/`, {
          params: {
            year: fromDate
          }
        });
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [fromDate, untilDate]);

  const renderItem = ({ item }) => {
    let titulo = item.titulo;
    if (typeof titulo === 'string') {
      titulo = parseJson(titulo);
    }
    
    return (
      <TouchableOpacity
        style={styles.article}
        onPress={() => navigation.navigate('Tela_de_leitura', { article: item })}
      >
        <Text style={styles.tipetext}>{item.tipo}</Text>
        <Text style={styles.title}>{titulo ? titulo[idioma] || titulo['en'] : 'Título indisponível'}</Text>
        <Text style={styles.date}>{item.data_publicacao}</Text>
        <View style={styles.estrela}>
          <FavoriteStar articleId={item.id} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fef6ff',
  },
  article: {
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e06eaa',
  },
  title: {
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e06eaa',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tipetext: {
    backgroundColor: '#e06eaa',
    marginHorizontal: "30%",
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  estrela: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});