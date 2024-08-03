import { ScrollView,Linking,TouchableOpacity,Image} from 'react-native';
import { Stack } from 'expo-router';

import { Text, View } from '../../components/Themed';
import useDynamicStyles from '../../components/Css.js';
import '../../constants/i18n.js'
import {useTranslation } from 'react-i18next';

export default function Sobre_a_revista() {

  const{t} = useTranslation();
  const styles = useDynamicStyles();

  const openWebLink1 = async () => {
    const url = 'https://https://red.bvsalud.org/lilacs/pt/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink2 = async () => {
    const url = 'https://www.ebsco.com/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink3 = async () => {
    const url = 'https://everyoneweb.es/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink4 = async () => {
    const url = 'http://www.latindex.unam.mx/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink5 = async () => {
    const url = 'http://www.redalyc.org/revista.oa?id=714';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink6 = async () => {
    const url = 'http://www.scopus.com/source/sourceInfo.uri?sourceId=19400157238&origin=resultslists';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink7 = async () => {
    const url = 'https://www.ebscohost.com/title-lists';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink8 = async () => {
    const url = 'https://ulrichsweb.serialssolutions.com/title/1457536176902/595298';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink9 = async () => {
    const url = 'http://www.oalib.com/journal/2336/1#.VvA0v-IrIdX';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink10 = async () => {
    const url = 'https://doaj.org/toc/1980-265X';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink11 = async () => {
    const url = 'https://ssl2.cabells.com/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink12 = async () => {
    const url = 'http://bases.bireme.br/cgi-bin/wxislind.exe/iah/online/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink13= async () => {
    const url = 'http://enfermagem.bvs.br/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink14= async () => {
    const url = 'https://www.scopus.com/sourceid/19400157238';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink15= async () => {
    const url = 'https://analytics.scielo.org/?journal=0104-0707&collection=scl';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink16= async () => {
    const url = 'http://fundacionindex.com/?page_id=1190';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  const openWebLink17= async () => {
    const url = 'https://periodicos.ufsc.br/index.php/textoecontexto';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
    }
  };
  return (
  
    <ScrollView>
    <View style={styles.container}>
      
      <View style={styles.conteinerTexto}>
        
        <Text style={styles.title}> {t("sobre.Informações")} </Text>
        <Text style={styles.texto}> {t("sobre.texto1")}</Text>
        <Text style={styles.texto}> {t("sobre.issn")}</Text>
      </View>
      <View style={styles.conteinerTexto}>
        <Text style={styles.title}> {t("sobre.Objetivo e Escopo")} </Text>
        <Text style={styles.texto}>{t("sobre.texto2")} </Text>
      </View>
      <View style={styles.conteinerTexto}>
        <Text style={styles.title}>{t("sobre.Missão")}</Text>
        <Text style={styles.texto}>{t("sobre.texto3")}</Text>
      </View>
     
      <View style={{
        backgroundColor:"#fff",
        width:"85%",
        padding:5,
        margin:"3%",
        borderRadius: 5,
        alignSelf:"center",
        alignContent:"center",
    }}>
        <Text style={styles.title}> {t("sobre.Métricas")} </Text>
       <View style={{flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
            <TouchableOpacity onPress={openWebLink14} style={{flex:1,flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
              <Image source={require("../../assets/images/LogoScopus.png")} style={{height:70,width:140,margin:"5%",borderColor:"#e06eaa",borderWidth:2,borderRadius:8}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.separator_80}/>
          <View style={{flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
            <TouchableOpacity onPress={openWebLink15} style={{flex:1,flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
              <Image source={require("../../assets/images/OIP.jpeg")} style={{height:75,width:85,margin:"5%",borderColor:"#e06eaa",borderWidth:2,borderRadius:8}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.separator_80}/>
          <View style={{flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
            <TouchableOpacity onPress={openWebLink16} style={{flex:1,flexDirection:"row",justifyContent:"space-around", backgroundColor:"#fff"}}>
              <Image source={require("../../assets/images/Cuiden2.png")} style={{height:70,width:120,margin:"5%",borderColor:"#e06eaa",borderWidth:2,borderRadius:8}}/>
            </TouchableOpacity>
          </View>
       
      </View>
      <View style={styles.conteinerTexto}>
        
        <TouchableOpacity onPress={openWebLink17}>
        <Text style={{color:"#0155fe", fontSize:23, fontWeight:"bold"}}> {t("sobre.Saiba Mais")} </Text>
        </TouchableOpacity>
      </View>
      
    </View>
    </ScrollView>
  
  );
}

