import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';
import { Text } from '../../components/Themed';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Por favor, insira seu email.');
      return;
    }
    setLoading(true);
    try {
      await axios.patch('http://192.168.1.13:8000/api/forgot/', { email }, { headers: { 'Content-Type': 'application/json' } });
      Alert.alert('Sucesso', 'Código de redefinição de senha enviado para seu email.');
      navigation.navigate('PasswordReset');
    } catch (error) {
      alert('Erro ao solicitar redefinição de senha');
      console.log('erro', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icone.png") }style={styles.image}/>
      <View style={styles.container1}>
      <Text style={styles.text}>{t("forgotPassword.email")}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>{t("forgotPassword.submit")}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#fef6ff',
  },
  container1: {
    padding:15,
    width:"90%",
    borderRadius:10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderColor: '#e06eaa',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e06eaa',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image:{
    width:130,
    height:150,
    margin: "5%",
},
});