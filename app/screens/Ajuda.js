import { Image,ScrollView,Linking,TouchableOpacity } from 'react-native';


import { Text, View } from '../../components/Themed'
import { useNavigation } from '@react-navigation/native';
import useDynamicStyles from '../../components/Css.js';
import '../../constants/i18n.js'
import {useTranslation } from 'react-i18next';


export default function Ajuda() {

  const{t} = useTranslation();
  const navigation = useNavigation();
  const styles = useDynamicStyles();

  const openEmailClient = async () => {
    const email = 'elisiane.lorenzini@ufsc.br'; // Substitua pelo endereço de e-mail desejado
    const url = `mailto:${email}`;
  
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Não é possível abrir o cliente de e-mail.');
      }
    } catch (error) {
      console.error('Erro ao abrir o cliente de e-mail:', error);
    }
  };
  const openEmailClient2 = async () => {
    const email = 'textoecontexto@contato.ufsc.br'; // Substitua pelo endereço de e-mail desejado
    const url = `mailto:${email}`;
  
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Não é possível abrir o cliente de e-mail.');
      }
    } catch (error) {
      console.error('Erro ao abrir o cliente de e-mail:', error);
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
  
    <View style={styles.container}>
      <TouchableOpacity style={{
         width:"90%",
         alignItems: 'center',
         justifyContent: "flex-start",
         backgroundColor:"#fff",
         margin:"5%",
         borderRadius:10,
      }} onPress={() => navigation.navigate("Tutorial")}>
        <Text style={styles.title}> {t("ajuda.Tutorial para o usuário")}</Text>
        <Image source={require("../../assets/images/Kit Portal de Periódicos_Thumbnail.png")} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.conteiner2}>
        <Text style={styles.title}>{t("ajuda.Contato para ajuda/suporte")}</Text>
        <View style={styles.conteiner3}>
          <Text style={styles.title2}>{t("ajuda.Contato Principal")}</Text>
          <Text style={styles.texto}>{t("ajuda.Elisiane Lorenzini - Editor-chefe")}</Text>
          <Text style={styles.texto}>{t("ajuda.Universidade Federal de Santa Catarina")}</Text>
          <Text style={styles.texto}>{t("ajuda.(UFSC)")}</Text>
          <TouchableOpacity onPress={openEmailClient2}>
            <Text style={styles.texto_link}>textoecontexto@contato.ufsc.br </Text>
          </TouchableOpacity>
          
          <View style={styles.separator}></View>
            <Text style={styles.title2}>{t("ajuda.Contato para Suporte Técnico")}</Text>
            <Text style={styles.texto}>{t("ajuda.Anna Khris Furtado Dutra")}</Text>
            <Text style={styles.texto}>{t("ajuda.Universidade Federal de Santa Catarina")}</Text>
            <Text style={styles.texto}>{t("ajuda.(UFSC)")}</Text>
          <View style={styles.separator}></View>
            
            <TouchableOpacity onPress={openWebLink17}>
              <Text style={{color:"#0155fe",fontSize:22, fontWeight:"bold"}}>{t("ajuda.Saiba mais")}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


