import 'intl-pluralrules'
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json";
import { Platform,NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export const Lresources = {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt }
  };

  const getLinguagem = () => {
    // Se não houver idioma salvo, obtém o idioma do dispositivo
    const linguagemCompleta = Platform.OS == "android" ? NativeModules.I18nManager.localeIdentifier : NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
    const primeiraSilaba = linguagemCompleta.split('_')[0]; // Extrai a primeira parte da linguagem
    return ['en', 'pt', 'es'].includes(primeiraSilaba) ? primeiraSilaba : 'en'; // Define a linguagem como 'en' se não for 'pt', 'es' ou 'en'
  };

 
  

i18next
  .use(initReactI18next) // inicializa o react-i18next
  .init({
    compatibilityJson: 'v3',
    resources: Lresources,
    lng: getLinguagem(), // idioma padrão
    fallbackLng: 'pt', // idioma de fallback
    debug: true, // habilita logs para debug
    interpolation: {
      escapeValue: false // evita a necessidade de escapar strings traduzidas
    }
  });

export default i18next;