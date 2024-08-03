import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator,StyleSheet,Image } from 'react-native';
import Pdf from 'react-native-pdf';
import { useTranslation } from 'react-i18next';
import RNFetchBlob from 'react-native-blob-util';

export default function SobreOAPp() {
  const { t } = useTranslation();

  return (
    <View style={styles.container_JS}>
      <Image source={require("../../assets/images/icone.png") }style={styles.image}/>
      <View style={styles.container_flat}>
        <Text style={styles.Titulo}>{t('SobreA.Versão do App')} </Text>
        <Text style={styles.Titulo}> 1.0.0 </Text>
      </View>
      <View style={styles.container_flat}>
       
        <Text style={styles.Titulo}> {t('SobreA.Autora')}</Text>
        <View style={styles.separator_80}></View>
        <Text style={styles.Titulo}> {t('SobreA.Consultor')}</Text>
        <View style={styles.separator_80}></View>
        <Text style={styles.Titulo}> {t('SobreA.Desenvolvedor')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_JS: {
    flex: 1,
    backgroundColor: '#fef6ff',
  },
  container_flat: {
    marginHorizontal: "11%",
    paddingBottom: 15,
    backgroundColor: '#fff',
    padding: "5%",
    borderRadius: 8,
    margin:"3%"
  },
  conteinerTexto: {
    alignItems: 'center',
    marginTop: '20%',
  },
  Titulo:{
    fontSize:17
  },
  Texto:{
   fontSize:18,
  },
  separator_80: {
    height: 1,
    width: '80%',
    backgroundColor:"#e06eaa",
    alignSelf:"center",
    margin:"3%"
},
image:{
  width:130,
  height:150,
  margin: "5%",
  alignSelf:"center"
},
})