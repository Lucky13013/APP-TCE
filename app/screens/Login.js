import { TouchableOpacity, TextInput, BackHandler, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View } from '../../components/Themed';
import styles from '../../components/Css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import '../../constants/i18n.js';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';

export default function Loguin() {
  const { t } = useTranslation();
  const senha = t("login.Senha");
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);

  // Logica de Login
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, insira o email e a senha.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.13:8000/api/login/', { email, password }, { headers: { 'Content-Type': 'application/json' } });
      const token = response.data.access;
      await AsyncStorage.setItem('token', token);
      console.log(token);
      console.log('entrou');
      if (check) {
        navigation.navigate('Interesses');
      } else {
        navigation.navigate('Tabs');
      }
    } catch (error) {
      alert('Erro ao fazer login');
      console.log('erro', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Logica para voltar para a tela inicial e não acessar páginas quando não estiver logado
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Tabs');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icone.png") }style={styles.image}/>
      <View style={styles.conteiner_loguin}>
        <Text style={styles.texto}>
          {t("login.texto1")} <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}><Text style={{ color: 'blue', fontSize: 16, alignSelf: 'center', textAlign: 'center' }}>{t("login.Cadastre-se")}</Text></TouchableOpacity>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={senha}
            value={password}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={{ padding: 20 }} onPress={togglePasswordVisibility}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ color: 'blue', fontSize: 16, alignSelf: 'center', textAlign: 'center' }}>{t("login.forgot_your_password")}</Text>
          </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>{t("login.texto2")}</Text>
        <TouchableOpacity onPress={() => setCheck(!check)} style={{flexDirection:"row", backgroundColor:"#fff",margin:"4%",alignContent:"flex-start"}}>
          {check ? <AntDesign name="checksquare" size={24} color="#e06eaa" /> :
           <AntDesign name="checksquareo" size={24} color="#e06eaa" />}
           <Text> {t("login.Notificações")} </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#333'} />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t("login.ENTRAR")}</Text>
            </TouchableOpacity>
            
          </>
        )}
      </View>
    </View>
  );
}