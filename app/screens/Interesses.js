import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import '../../constants/i18n';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Interesses() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [search, setSearch] = useState('');
  const [descritores, setDescritores] = useState([]);
  const [filteredDescritores, setFilteredDescritores] = useState([]);
  const [selectedDescritores, setSelectedDescritores] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('Login'); // Redireciona para a tela de login
        } else {
          const response = await fetch('http://192.168.1.13:8000/api/users/', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUserName(data[0].name); // Ajuste para acessar a propriedade correta do objeto
        }
      } catch (error) {
        console.log('Error checking authentication:', error);
      }
    };

   

    const fetchInitialData = async () => {
      await checkAuth();
      await fetchDescritores();
      await fetchFavoritos();
    };

    fetchInitialData();
  }, []);

  const fetchDescritores = async () => {
    try {
      const response = await fetch('http://192.168.1.13:8000/api/keywords/');
      const data = await response.json();
      setDescritores(data);
      setFilteredDescritores(data[i18n.language] || []);
    } catch (error) {
      console.error('Error fetching descritores:', error);
    }
  };

  const fetchFavoritos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }

      const response = await fetch('http://192.168.1.13:8000/api/list-temas_preferidos/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error('Unauthorized: Check your token');
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setSelectedDescritores(data);
      } else {
        console.error('Expected an array of favoritos, but received:', data);
      }
    } catch (error) {
      console.error('Error fetching favoritos:', error);
    }
  };

  const handleSearch = () => {
    if (descritores && Array.isArray(filteredDescritores)) {
      const filtered = filteredDescritores.filter((descritor) =>
        descritor.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDescritores(filtered);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredDescritores(descritores[i18n.language] || []);
  };

  const toggleDescritor = async (descritor) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }

      const response = await fetch(`http://192.168.1.13:8000/api/toggle-temas-preferidos/${descritor}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error('Unauthorized: Check your token');
        return;
      }

      const data = await response.json();
      console.log(data.message);

      const updatedDescritores = [...selectedDescritores];
      const index = updatedDescritores.indexOf(descritor);

      if (index > -1) {
        updatedDescritores.splice(index, 1);
      } else {
        updatedDescritores.push(descritor);
      }

      setSelectedDescritores(updatedDescritores);
    } catch (error) {
      console.log('Error toggling descritor:', error);
    }
  };

  const renderDescritor = ({ item }) => (
    <TouchableOpacity onPress={() => toggleDescritor(item)}>
      <View style={styles.Link3}>
        <Text style={selectedDescritores.includes(item) ? styles.selectedText : styles.text}>{item}</Text>
        {selectedDescritores.includes(item) ? <AntDesign name="checksquare" size={24} color="#e06eaa" /> : <AntDesign name="checksquareo" size={24} color="#e06eaa" />}
      </View>
    </TouchableOpacity>
  );

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token deletado');
      navigation.navigate('Tabs');
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container_JS}>
      <View style={styles.conteinerTexto}>
        <Image source={require("../../assets/images/PR.jpeg")} style={styles.image_i} />
      </View>
      <View style={styles.Caixa_superior}>
        <Text style={styles.title}>{userName}</Text>
      </View>
          <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.texto2}>{t("preferencias.SAIR")}</Text>
                <Feather name="log-out" size={24} color="#fff" />
              </TouchableOpacity>
      <View style={styles.conteiner2}>
        <View style={styles.Caixa_inferior}>
          <Text style={styles.title2}>{t("interesses.Qual sua área de interesse?")}</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder={t("interesses.Pesquisar descritores...")}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={24} color="gray" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
     
        <FlatList
          data={filteredDescritores}
          renderItem={renderDescritor}
          keyExtractor={(item) => item}
          windowSize={5}
        />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_JS: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fef6ff',
  },
  container_flat: {
    marginHorizontal: "11%",
    paddingBottom: 15,
    backgroundColor: '#fff',
    padding: "5%",
    borderRadius: 8
  },
  conteinerTexto: {
    alignItems: 'center',
    marginTop: '20%',
  },
  image_i: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  Caixa_superior: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteiner2: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  Caixa_inferior: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e06eaa',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 5,
  },
  searchButton: {
    marginLeft: 5,
  },
  Link3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
  selectedText: {
    flex: 1,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#a74e9e',
    width: '70%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:"5%"
},
texto2: {
  fontSize: 20,
  fontWeight:"bold",
  color:"#fff"
},
});