import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    titleKey: 'tutorial.slide1.title',
    textKey: 'tutorial.slide1.text',
    image: require('../../assets/images/tutorial1.png'),
  },
  {
    key: 'slide2',
    titleKey: 'tutorial.slide2.title',
    textKey: 'tutorial.slide2.text',
    image: require('../../assets/images/tutorial2.png'),
  },
  {
    key: 'slide3',
    titleKey: 'tutorial.slide3.title',
    textKey: 'tutorial.slide3.text',
    image: require('../../assets/images/tutorial3.png'),
  },
  {
    key: 'slide4',
    titleKey: 'tutorial.slide4.title',
    textKey: 'tutorial.slide4.text',
    image: require('../../assets/images/tutorial9.png'),
  },
  {
    key: 'slide5',
    titleKey: 'tutorial.slide5.title',
    textKey: 'tutorial.slide5.text',
    image: require('../../assets/images/tutorial5.png'),
  },
  {
    key: 'slide7',
    titleKey: 'tutorial.slide7.title',
    textKey: 'tutorial.slide7.text',
    image: require('../../assets/images/tutorial7.png'),
  },
  {
    key: 'slide6',
    titleKey: 'tutorial.slide6.title',
    textKey: 'tutorial.slide6.text',
    image: require('../../assets/images/tutorial6.png'),
  },
  {
    key: 'slide8',
    titleKey: 'tutorial.slide8.title',
    textKey: 'tutorial.slide8.text',
    image: require('../../assets/images/tutorial8.png'),
  },
];

export default function Tutorial() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleFinishTutorial = async () => {
    await AsyncStorage.setItem('tutorialSeen', 'true');
    navigation.navigate('Tabs'); // Substitua 'Tabs' pela tela que você deseja navegar após o tutorial
  };

  return (
    <Swiper loop={false} showsPagination={true} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      {slides.map((slide, index) => (
        <View key={slide.key} style={styles.slide}>
          <Image source={slide.image} style={styles.image}/>
          <Text style={styles.title}>{t(slide.titleKey)}</Text>
          <Text style={styles.text}>{t(slide.textKey)}</Text>
          {index === slides.length - 1 && (
            <TouchableOpacity style={styles.button} onPress={handleFinishTutorial}>
              <Text style={styles.buttonText}>{t('tutorial.finishButton')}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    padding: 16,
    backgroundColor: '#fef6ff',
  },
  image: {
    width: 225,
    height: 450,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#e06eaa',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e06eaa',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
