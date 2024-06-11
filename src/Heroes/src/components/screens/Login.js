import { useState, useEffect, createContext } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button, Alert} from 'react-native'
import { useAuth } from '../services/AuthProvider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../api/api'

export default function Login(){
    const { signIn } = useAuth();
    const [email, setEmail]=useState('adm@pucminas.com')
    const [senha, setSenha]=useState('12345')
    const [passwordEye, setPasswordEye]= useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [recoveryPassword, setRecoveryPassword] = useState('');

    const handleModalClose = () => {
      setModalVisible(false);
    };

    const recovery = () => {
      if (recoveryEmail !== '' && recoveryPhrase !== '' && recoveryPassword !== '') {
        api.post('/recoverpassword', 
          {
            email: recoveryEmail,
            password: recoveryPassword,
            secretquestion: recoveryPhrase
          }
        ).then(response => {
          Alert.alert('Sucesso', response.data.message);
          setRecoveryEmail('');
          setRecoveryPhrase('');
          setRecoveryPassword('');
          setModalVisible(false);
        }).catch(error => {
          Alert.alert('Erro', error.response.data.message || 'Algo deu errado, por favor, tente novamente.');
        });
      } else {
        Alert.alert('Erro', 'Preencha todos os campos');
      }
    };

    const handleSignIn = () => {
      signIn({ email, senha });
    };
   
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text  style={style.btnEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                style={style.btnEntrar} onPress={handleSignIn}>
                <Text  style={style.txtBotao}>Entrar</Text>
            </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleModalClose}

            >
              <View style={style.modal}>

                <View>
                <TextInput 
                  placeholder='E-mail'
                  style={style.secret}
                  onChangeText={text=>setRecoveryEmail(text)}>
                </TextInput>

                <TextInput 
                  placeholder='Frase de recumeração'
                  style={style.secret}
                  onChangeText={text=>setRecoveryPhrase(text)}>
                </TextInput>

                <TextInput 
                  placeholder='Nova senha'
                  style={style.secret}
                  onChangeText={text=>setRecoveryPassword(text)}>
                </TextInput>
              
                <View style={{display:"flex", flexDirection: "row"}}>
                  <TouchableOpacity
                    style={style.btnCancelar}
                    onPress={() => setModalVisible(false)}>
                    <Text style={style.TxtbtnCancelar}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={style.btnCadastrar}
                    onPress={recovery}>
                    <Text style={style.TxtbtnCadastrar}>Recuperar</Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </Modal>
     </View>
    )
}

const style=StyleSheet.create({
  modal: {
    backgroundColor:"white",
    display:"flex",
    justifyContent:"center",
    alignSelf: 'center',
    alignItems:"center",
    marginTop: '50%',
    width:330,
    height:450,
    borderRadius: 30,
    shadowColor: "black",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Android shadow property
    elevation: 5,
  },

  TxtbtnCadastrar: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },

  btnCadastrar: {
    backgroundColor: '#F26430',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    marginTop: 50,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
  },

  TxtbtnCancelar: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },

  btnCancelar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: "#236B8E",
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    marginRight: 10
  },

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
    marginTop: 10,
    alignSelf: 'center'
  },

  btnEsqueciSenha:{
    borderBottomWidth:1,
    fontSize:20,
    alignSelf:'flex-end',
    marginRight:20,
    marginTop:30
  },

  secret:{
    borderBottomWidth:1,
    fontSize:20,
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