
import {TouchableOpacity, Image,TextInput, ActivityIndicator, KeyboardAvoidingView, KeyboardAvoidingViewBase } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

import { Text, View } from '../../components/Themed';
import  styles  from '../../components/Css';
import { useNavigation } from '@react-navigation/native';

import ReactNativeAsyncStorage  from '@react-native-async-storage/async-storage';

import '../../constants/i18n.js'
import {useTranslation } from 'react-i18next';

export default function Cadastro() {

  const{t} = useTranslation();

  const Nome = t("cadastro.Nome");

  const Senha = t("cadastro.Senha");

  const Confirmar = t("cadastro.Confirmar Senha");

  
  const [nome, setnome] = useState('')

  const [email, setemail] = useState('')

  const [senha, setsenha] = useState('')

  const [confirmarSenha, setconfirmarSenha] = useState('')

  const [loading, setLoading] = useState(false);

  const [foi, setFoi] = useState(false)

  const navigation = useNavigation();


  const handleCadastroPress  = async () => {


    // Valide os campos e execute a lógica de cadastro aqui

    // Exemplo de validação básica
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }else {

    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.13:8000/api/users/', {'name': nome, 'email':email,'password': senha, 'is_adm':false});
      console.log(response);
      navigation.navigate('Login');
      } catch (error) {
        console.log(error)
        alert('Erro ao fazer o cadastro')
          
      }finally {
        setLoading(false)
      }
    };
  
  return (

    <View style={styles.container}>
    
      <Image source={require('../../assets/images/Kit Portal de Periódicos_Thumbnail.png')} style={styles.image3}></Image>

      <View style={styles.conteiner_loguin}>
       
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder= {Nome}
              value={nome}
              onChangeText={(texto) => setnome(texto)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(texto)=> setemail(texto)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={Senha}
              value={senha}
              onChangeText={(texto)=>setsenha(texto)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={Confirmar}
              value={confirmarSenha}
              onChangeText={(texto)=> setconfirmarSenha(texto)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>

          
          {loading ? <ActivityIndicator size={'large'} color={'#333'}/>
          :<>
          
          <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
            <Text style={styles.buttonText}>{t("cadastro.CADASTRAR")}</Text>
          </TouchableOpacity>
          
          </>}
        </View>
       
      </View>
   
  );
};