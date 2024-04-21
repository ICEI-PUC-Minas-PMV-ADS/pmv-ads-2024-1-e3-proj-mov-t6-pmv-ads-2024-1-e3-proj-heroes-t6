import { useState, useEffect, createContext } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useAuth } from '../services/AuthProvider'

// Incompleto *****

export default function Login(){
    const { signIn } = useAuth();
    const [email, setEmail]=useState('wesley@gmail.com')
    const [senha, setSenha]=useState('1234')

    const handleSignIn = () => {
      signIn({ email, senha });
    };

    // Abrir o banco de dados e criar a tabela de usuários na inicialização
   
    return(
    <View>
        <View>
            <TextInput 
                placeholder='Email'
                style={estilos2.inputs}
                value={email}
                onChangeText={text=>setEmail(text)}>
            </TextInput>

            <TextInput 
                placeholder='Senha'
                style={estilos2.inputs}
                value={senha}
                onChangeText={text=>setSenha(text)}>
            </TextInput>
            </View>

            <View>
            <TouchableOpacity>
                <Text  style={estilos2.btnEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                style={estilos2.btnEntrar} onPress={handleSignIn}>
                <Text  style={estilos2.txtBotao}>Entrar</Text>
            </TouchableOpacity>
            </View>
     </View>
    )
}

const estilos2=StyleSheet.create({
    inputs:{
      borderBottomWidth:1,
      fontSize:18,
      width:330,
      alignSelf:'center'
    },
  
    btnEsqueciSenha:{
      borderBottomWidth:1,
      fontSize:20,
      alignSelf:'flex-end',
      marginRight:20,
      marginTop:30
    },
    btnEntrar:{
      backgroundColor:'green',
      justifyContent:'center',
      alignItems:'center',
      width:350,
      marginTop:100,
      borderRadius:20,
      height:50,
      alignSelf:'center'
    },
    txtBotao:{
      fontSize:20,
      alignSelf:'center'
    
      
    },
  
  })