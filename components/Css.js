import React from 'react';
import { StyleSheet } from 'react-native';
import { useFontSize } from './FontSizeProvider';

export default function useDynamicStyles() {
  const { fontSizes } = useFontSize();

  return StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conteiner1:{
        display:'flex',
        backgroundColor:"#fff",
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        margin:"3%",
        width:"88%",
        height:"35%",
        borderRadius:10,
        flex:1,
    },
    conteiner2:{
        width:"90%",
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor:"#fff",
        margin:"5%",
        borderRadius:10,
    },
    conteiner3:{
        width:"90%",
        flex:1,
        display:"flex",
        alignContent:"flex-start",
        backgroundColor:"#fff",
        marginTop:"5%",
    },
    contenier4:{
        display:'flex',
        flex:1,
        justifyContent: 'flex-start',
        alignItems:"center",
        margin:5,
        width:"85%",
        borderRadius:10
      },
    container_JS: {
        flex:1,
        display:"flex",
        alignItems: 'center',
        justifyContent: "flex-start",
        alignContent:"center",
    },
    conteinerTexto:{
        backgroundColor:"#fff",
        width:"85%",
        padding:5,
        margin:"3%",
        borderRadius: 5,
        alignSelf:"center",
    },
    conteinerimage:{
        backgroundColor:"#fff",
        width:"85%",
        padding:5,
        margin:"3%",
        borderRadius: 5,
        flexDirection:"row",
    },
    conteiner_loguin:{
        width:"85%",
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor:"#fff",
        margin:"10%",
        borderRadius:25,
        paddingTop:15,
        paddingBottom:25,
    },
    title: {
        fontSize: 20 ,
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 19,
        fontWeight: 'bold',
        
    },
    title_f20: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    texto: {
        fontSize: 18,
    },
    texto_config: {
        fontSize: 18,
        margin:"3%",
        color:"#4f4f4f",
    },
    texto_config2: {
        fontSize: 14,
        margin:"4%",
        color:"#4f4f4f",
    },
    texto1: {
        fontSize: 15,
        fontWeight:"bold",
        
    },
    texto2: {
        fontSize: 20,
        fontWeight:"bold",
        color:"#fff"
    },
    texto2b: {
        fontSize: 20,
        fontWeight:"bold",
        color:"#000000"
    },
    texto_link:{
        fontSize:15,
        fontWeight:"bold",
        color:"#0155fe"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
      },
    separator: {
        marginVertical: 15,
        height: 1,
        width: '98%',
        backgroundColor:"#e06eaa"
    },
    separator_80: {
        height: 1,
        width: '80%',
        backgroundColor:"#e06eaa",
        alignSelf:"center",
    },
    image:{
        width:130,
        height:150,
        margin: "5%",
    },
    image3:{
        width:200,
        height:250,
        margin: "10%",
    },
    image2:{
        width: 175,
        height:100
    },
    lin_imagem:{
        display: "flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image_i:{
        width:150,
        height:150,
        margin:"5%",
        borderRadius:100
    },
    cabecalho:{
        backgroundColor:"#165d9c",
    },
    input:{
        backgroundColor:"#e2e2e2",
        padding:10,
        width:"85%",
        margin:"2%",
        borderRadius:8,
        alignSelf:'center',
    },
    
    caixa_pesquisa:{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        width:'100%',
        flexDirection:"row",
        margin:"5%",
        marginLeft: 15
    },
    Org_links:{
        display:'flex',
        alignItems:"flex-start",
        justifyContent:"flex-start",
        flexDirection:"row",
        backgroundColor:"#fff",
        flex: 1,
        width:"85%",
        paddingHorizontal:5
    },
    Caixa_superior: {
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 8,
        padding:7,
        margin: "5%",
        flexDirection:"row",
        alignSelf:'center',
    },
    Caixa_opções: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 8,
        margin: "5%",
        flexDirection:"row",
        alignContent:'space-around',
        alignSelf:"flex-start",
        flex:1,
        paddingLeft:"5%",
    },
    divisaEsc: {
        backgroundColor: "#fff",
        paddingHorizontal:10,
        display:"flex",
        justifyContent: 'center',
        alignItems:"center", 
    },
    divisaDir: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignContent:"center",
        paddingHorizontal: 35,
        textAlign:"center",
    },
    Caixa_inferior:{
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 8,
        padding:5,
        alignSelf: "center",
    },
    
    logo:{
        width: 70,
        height: 100,
        margin: 5
    },
    Link:{
        backgroundColor:"#a74e9e",
        alignItems:'center',
        textAlign:"center",
        margin:'5%',
        padding: 5,
        borderRadius: 10,
    },
    Link2:{
        backgroundColor:"#fff",
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexDirection:"row",
        margin:'3%',
        padding: 10,
        borderRadius: 10,
        width:"85%",
        borderWidth: 1,
        borderColor: '#e06eaa',
    },
    Link3:{
        backgroundColor:"#fff",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        margin:'2%',
        padding: 3,
        paddingHorizontal:"5%",
        borderRadius: 10,
        width:"85%"
    },
    Link4:{
        backgroundColor:"#e2e2e2",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        margin:'2%',
        padding: 3,
        paddingRight:'10%',
        paddingLeft:'1%',
        borderRadius: 10,
        width:"85%"
    },
    Link5:{
        backgroundColor:"#e2e2e2",
        justifyContent:"space-evenly",
        alignContent:"space-between",
        alignItems:"center",
        margin:'2%',
        padding: 5,
        paddingRight:'10%',
        paddingLeft:'1%',
        borderRadius: 10,
        width:"100%"

    },
    Link6:{
        backgroundColor:"#fff",
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexDirection:"row",
        margin:'3%',
        padding: 10,
        borderRadius: 10,
        width:"85%",
    },
    slider:{
        width:225,
        height:40,
        margin: "5%",
        backgroundColor:"#fff"
    },
    amostra:{
        width:30,
        height:40,
        margin: "5%",
        backgroundColor:"#fff",
        alignSelf:"center"
    },
    opções:{
        backgroundColor: "#fff",
        width: '80%',
        marginHorizontal:'25%',
        justifyContent:"space-around",
        flex:1
    },
    inputContainer: {
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e06eaa',
        marginBottom: 20,
        width:'85%',
        alignSelf:'center'
    },
    button: {
        backgroundColor: '#a74e9e',
        width: '85%',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:"5%"
    },
    button2:{
        flexDirection:"row",
        borderRadius:10

    },
    header_s:{
        fontWeight:"bold",
        marginLeft:"55%",
        textAlign:'center'
      }
});
}
