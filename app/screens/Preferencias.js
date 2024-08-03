import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider'; // Importando Slider do pacote correto
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { RadioButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import useDynamicStyles from '../../components/Css.js';


export default function Preferencias() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [fontSize, setFontSize] = useState(15);
  const [linguagem, setLinguagem] = useState(i18n.language);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styles = useDynamicStyles();

  // Carregar o idioma e tamanho da fonte selecionados do AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          setLinguagem(savedLanguage);
          i18n.changeLanguage(savedLanguage); // Alterar o idioma do i18n
        }

        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize) {
          setFontSize(parseInt(savedFontSize, 10));
        }
      } catch (error) {
        console.error('Erro ao carregar configurações do AsyncStorage:', error);
      }
    };

    loadSettings();
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLinguagem(newLanguage);
    i18n.changeLanguage(newLanguage);
    AsyncStorage.setItem('language', newLanguage);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    AsyncStorage.setItem('fontSize', size.toString());
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!storedToken);
      } catch (error) {
        console.error('Erro ao obter token do AsyncStorage:', error);
        setIsLoggedIn(false);
      }
    };

    getToken();
  }, []);

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
    <View style={styles.container_JS}>
      <View style={styles.conteiner1}>
        <Text style={{ ...styles.texto_config, fontSize: fontSize }}>
          {t("preferencias.IDIOMA DE LEITURA PREFERENCIAL")}
        </Text>
        <Text style={{ ...styles.texto_config2, fontSize: fontSize }}>
          {t("preferencias.texto1")}
        </Text>
        <View style={styles.Caixa_opções}>
          <RadioButton.Group onValueChange={(newValue) => handleLanguageChange(newValue)} value={linguagem}>
            <RadioButton.Item label={t('preferencias.english')} value="en" />
            <RadioButton.Item label={t('preferencias.spanish')} value="es" />
            <RadioButton.Item label={t('preferencias.portuguese')} value="pt" />
          </RadioButton.Group>
        </View>
        <View style={styles.separator_80} />
        <View style={styles.conteiner1}>
          <Text style={{ fontSize: fontSize, marginBottom: 10,alignSelf:"center"}}>
            {t("preferencias.TAMANHO DA FONTE")}
          </Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={10}
            maximumValue={30}
            step={1}
            value={fontSize}
            onValueChange={handleFontSizeChange}
            minimumTrackTintColor="#a74e9e"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#e06eaa"
          />
          <Text style={{ fontSize: fontSize }}>{Math.round(fontSize)}</Text>
        </View>
        <View style={styles.separator_80} />
        {isLoggedIn ? (
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.texto2}>{t("preferencias.SAIR")}</Text>
            <Feather name="log-out" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.texto2}>{t("preferencias.ENTRAR")}</Text>
            <Feather name="log-in" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}