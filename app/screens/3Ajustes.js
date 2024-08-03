import { TouchableOpacity,Image} from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useDynamicStyles from '../../components/Css.js';
import { useNavigation } from '@react-navigation/native';
import '../../constants/i18n.js'
import {useTranslation } from 'react-i18next';

export default function Ajustes() {

  const navigation = useNavigation();
  const styles = useDynamicStyles();

  const{t} = useTranslation();


  return (

    

    <View style={styles.container}>
        
          <TouchableOpacity style={styles.Link2} onPress={() => navigation.navigate('Interesses')}>
            <Text style={styles.texto2b}> {t("pages.Perfil")} </Text>
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.Link2} onPress={() => navigation.navigate('Sobre_a_revista')}>
            <Text style={styles.texto2b}> {t("pages.Sobre a Revista")} </Text>
            <Entypo name="info-with-circle" size={24} color="black" />
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.Link2} onPress={() => navigation.navigate('Ajuda')}>
            <Text style={styles.texto2b}> {t("pages.Ajuda")} </Text>
            <Entypo name="help-with-circle" size={24} color="black" />
          </TouchableOpacity>
       
          <TouchableOpacity style={styles.Link2} onPress={() => navigation.navigate('Preferencias')}>
            <Text style={styles.texto2b}> {t("pages.Preferencias")} </Text>
            <FontAwesome name="cog" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Link2} onPress={() => navigation.navigate('Sobre_o_APP')}>
            <Text style={styles.texto2b}> {t("pages.Sobre o APP")} </Text>
            <FontAwesome name="mobile" size={32} color="black" />
          </TouchableOpacity>


          <View style={{flexDirection:"row", margin:5,}}>
            <Image source={require("../../assets/images/UFSC.png")} style={{height:70,width:50,marginHorizontal:20}}/>
            <Image source={require("../../assets/images/pós.png")} style={{height:58,width:170,marginVertical:15,marginHorizontal:25}}/>
          </View>

    </View>
  );
}
