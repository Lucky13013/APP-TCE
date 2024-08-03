import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import '../../constants/i18n.js';
import { useTranslation } from 'react-i18next';
import FavoriteStar from '../../components/ToggleFavorite.js';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFavoritos, setFilteredFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState('default');
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Estado para controlar a visibilidade da lista suspensa
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const idioma = i18n.language;

  useEffect(() => {
    fetchFavoritos();
  }, [order]);

  useEffect(() => {
    if (search === '') {
      setFilteredFavoritos(favoritos);
    } else {
      const filtered = favoritos.filter(article =>
        article.palavras_chave.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFavoritos(filtered);
    }
  }, [search, favoritos]);

  const fetchFavoritos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://192.168.1.13:8000/api/favoritos/?order=${order}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavoritos(response.data);
      setFilteredFavoritos(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFavoritos();
  };

  const parseJson = (jsonString) => {
    try {
      return JSON.parse(jsonString.replace(/\\/g, '').replace(/'/g, '"'));
    } catch (e) {
      return null;
    }
  };

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

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.caixa_pesquisa}>
        <AntDesign name="search1" size={30} color="#e06eaa" />
        <TextInput
          placeholder={t('pesquisa.Buscar')}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.separator_80}></View>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.dropdownButtonText}>
            {order === 'oldest' &&  t("Favoritos.Antigos")}
            {order === 'newest' && t("Favoritos.Novos")}
            {order === 'recent_added' && t("Favoritos.Recentemente Adicionados")}
            {order === 'default' && t("Favoritos.Recentemente Adicionados")}
          </Text>
          {isDropdownVisible? <AntDesign name="up" size={30} color="#fff" />: <AntDesign name="down" size={30} color="#fff" />}
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity
              style={[styles.dropdownOption, order === 'oldest' && styles.dropdownOptionSelected]}
              onPress={() => handleOrderChange('oldest')}
            >
              <Text style={[styles.dropdownOptionText, order === 'oldest' && styles.dropdownOptionTextSelected]}>
                {t("Favoritos.Antigos")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownOption, order === 'newest' && styles.dropdownOptionSelected]}
              onPress={() => handleOrderChange('newest')}
            >
              <Text style={[styles.dropdownOptionText, order === 'newest' && styles.dropdownOptionTextSelected]}>
                {t("Favoritos.Novos")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownOption, order === 'recent_added' && styles.dropdownOptionSelected]}
              onPress={() => handleOrderChange('recent_added')}
            >
              <Text style={[styles.dropdownOptionText, order === 'recent_added' && styles.dropdownOptionTextSelected]}>
                {t("Favoritos.Recentemente Adicionados")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownOption, order === 'default' && styles.dropdownOptionSelected]}
              onPress={() => handleOrderChange('default')}
            >
              <Text style={[styles.dropdownOptionText, order === 'default' && styles.dropdownOptionTextSelected]}>
                {t("Favoritos.Últimos Adicionados")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.separator_80}></View>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={filteredFavoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.5}
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
  caixa_pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 2,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#e06eaa',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  separator_80: {
    marginVertical: 20,
  },
  estrela:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  dropdownContainer: {
    marginHorizontal: 20,
  },
  dropdownButton: {
    backgroundColor: '#e06eaa',
    padding: 10,
    borderRadius: 5,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  dropdownButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:16
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e06eaa',
    marginTop: 10,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    color: '#e06eaa',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownOptionSelected: {
    backgroundColor: '#e06eaa',
  },
  dropdownOptionTextSelected: {
    color: '#fff',
  },
});