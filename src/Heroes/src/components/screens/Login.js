import { useState, useEffect, createContext } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useAuth } from '../services/AuthProvider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Incompleto *****

export default function Login(){
    const { signIn } = useAuth();
    const [email, setEmail]=useState('wesley@gmail.com')
    const [senha, setSenha]=useState('1234')
    const [passwordEye, setPasswordEye]= useState(true)


    const handleSignIn = () => {
      signIn({ email, senha });
    };

    // Abrir o banco de dados e criar a tabela de usuários na inicialização
   
    return(
    <View>
        <View>
            <TextInput 
                placeholder='Email'
                style={style.inputs}
                value={email}
                onChangeText={text=>setEmail(text)}>
            </TextInput>

            <TextInput 
                placeholder='Senha'
                style={style.inputs}
                value={senha}
                secureTextEntry={passwordEye}
                onChangeText={text=>setSenha(text)}>
            </TextInput>
            <TouchableOpacity onPress={() => setPasswordEye(!passwordEye)}>
              <Icon style={style.icon} name={passwordEye ? 'eye-outline' : 'eye-off-outline'} size={28} color='gray' />
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity>
                <Text  style={style.btnEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                style={style.btnEntrar} onPress={handleSignIn}>
                <Text  style={style.txtBotao}>Entrar</Text>
            </TouchableOpacity>
            </View>
     </View>
    )
}

const style=StyleSheet.create({
  icon:{
    position: 'absolute',
    marginLeft: '82%',
    marginTop: -40,
  },
  inputs:{
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    height: 60,
    alignSelf: 'center'
  },

  btnEsqueciSenha:{
    borderBottomWidth:1,
    fontSize:20,
    alignSelf:'flex-end',
    marginRight:20,
    marginTop:30
  },
  btnEntrar:{
    backgroundColor:'#F26430',
    justifyContent:'center',
    alignItems:'center',
    width:350,
    marginTop: 60,
    borderRadius:20,
    height:50,
    alignSelf:'center'
  },
  txtBotao:{
    fontSize:20,
    alignSelf:'center',
    color: 'white'
  },
  
  })