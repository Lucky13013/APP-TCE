import React, { useState } from 'react';
import { FlatList, TextInput, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import '../../constants/i18n.js';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import FavoriteStar from '../../components/ToggleFavorite.js';

export default function Aba_pesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const idioma = i18n.language;
  const [isSortMenuVisible, setSortMenuVisible] = useState(false);

  const nbusca = t("pesquisa.Buscar");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.1.13:8000/api/search/`, {
        params: {
          keyword: searchQuery,
          order: sortOrder, // Adiciona o parâmetro de ordenação na requisição
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setLoading(false);
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

  const toggleSortMenu = () => {
    setSortMenuVisible(!isSortMenuVisible);
  };

  const selectSortOrder = (order) => {
    setSortOrder(order);
    handleSearch();
    setSortMenuVisible(false);
  };

  const renderSortMenu = () => (
    isSortMenuVisible && (
      <View style={styles.sortMenu}>
        <TouchableOpacity onPress={() => selectSortOrder('recent')}>
          <Text style={styles.sortMenuItem}>{t("Favoritos.Novos")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectSortOrder('oldest')}>
          <Text style={styles.sortMenuItem}>{t("Favoritos.Antigos")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectSortOrder('recently_added')}>
          <Text style={styles.sortMenuItem}> {t("Favoritos.Recentemente Adicionados")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectSortOrder('last_added')}>
          <Text style={styles.sortMenuItem}>{t("Favoritos.Últimos Adicionados")}</Text>
        </TouchableOpacity>
      </View>
    )
  );

  const getSortOrderLabel = () => {
    switch (sortOrder) {
      case 'recent':
        return t("Favoritos.Novos");
      case 'oldest':
        return t("Favoritos.Antigos");
      case 'recently_added':
        return t("Favoritos.Recentemente Adicionados");
      case 'last_added':
        return t("Favoritos.Últimos Adicionados");
      default:
        return 'Ordenar';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.caixa_pesquisa}>
        <AntDesign name="search1" size={30} color='#e06eaa' />
        <TextInput
          placeholder={nbusca}
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.sortButton} onPress={toggleSortMenu}>
        <Text style={styles.sortButtonText}>{getSortOrderLabel()}</Text>
        <AntDesign name={isSortMenuVisible ? 'up' : 'down'} size={20} color='#fff' />
      </TouchableOpacity>
      {renderSortMenu()}
      <View style={styles.separator_80}></View>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={results}
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
    alignContent:"center"
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
  caixa_pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e06eaa',
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  separator_80: {
    marginVertical: 20,
  },
  estrela: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e06eaa',
    backgroundColor: '#e06eaa',
    width:"90%",
    alignSelf:"center"
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  sortMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e06eaa',
    borderRadius: 5,
    marginVertical: 10,
    width:"90%",
    alignSelf:"center"
  },
  sortMenuItem: {
    padding: 10,
    textAlign: 'center',
    color: '#e06eaa',
    borderBottomWidth: 1,
    borderBottomColor: '#e06eaa',
  },
});
