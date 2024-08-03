import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import '../../constants/i18n.js';
import useFirstAccess from "../../components/Firstacess.js";  // Certifique-se de que o caminho está correto
import { useFontSize } from '../../components/FontSizeProvider.js';

export default function TelaInicial() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const isFirstAccess = useFirstAccess();
  const { fontSize } = useFontSize();

  useEffect(() => {
    // Generate years from the current year to 2007
    const generatedYears = [];
    for (let year = currentYear; year >= 2007; year--) {
      generatedYears.push(year);
    }
    setYears(generatedYears);
  }, [currentYear]);

  useEffect(() => {
    if (isFirstAccess) {
      navigation.navigate('Tutorial');  // Substitua 'Tutorial' pelo nome correto da sua tela de tutorial
    }
  }, [isFirstAccess]);

  const Volumes = ({ item }) => (
    <TouchableOpacity
      style={styles.article}
      onPress={() => navigation.navigate('ArticleList', {
        fromDate: `${item}`,
        untilDate: `${item}`
      })}
    >
      <Text style={styles.tipetext}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/images/icone.png")} style={styles.image} />
      <Text style={styles.headerText}>{t("inicio.Número atual")}</Text>
      <Volumes item={currentYear} />
      <Text style={styles.headerText}>{t("inicio.Números anteriores")}</Text>
      {years.slice(1).map((year) => (
        <Volumes key={year.toString()} item={year} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    padding: 20,
    backgroundColor: '#fef6ff',
  },
  headerText: {
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 22
  },
  article: {
    textAlign: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#e06eaa',
    borderWidth: 1,
  },
  tipetext: {
    textAlign: 'center',
    fontSize: 20,
  },
  image: {
    alignSelf: "center",
    height: 200,
    width: 200,
  },
});