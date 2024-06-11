import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Title from '../component/Title';
import { useAuth } from '../services/AuthProvider'
import api from '../../api/api';

//**************************************Telas***************************************/

const TelaUsuario=({navigation})=> {
  const { id, signOut } = useAuth()

    const delet = () => {
      try {
        api.post('/delUser', {userid: id});
        signOut()
      } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
      }
    }
    return (
        <View style={styles.background}>
        <View style={styles.background1}>

            <View>
                <Image
                source={require('../../../assets/Image/user.png')}
                style={styles.imagemUser}/>
            </View>

                <View style={styles.ContainerInfoUser}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('EditInfoUser')}}>
                    <Text style={styles.txtEditInfo}>Editar informações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                      Alert.alert(
                        "Remover Usuario", 
                          "Você tem certeza que deseja remover o usuario?", 
                            [
                          // Botões do Alert
                              {
                                text: "Voltar",
                                   onPress: () => {
                                     console.log("Usuário escolheu Voltar");
                                   },
                                     style: "cancel"
                              },
                              { 
                                text: "Confirmar", 
                                onPress: () => delet()
                              }
                           ]
                              )
                    }}>
                    <Text style={styles.txtEditInfo2}>Remover minha conta</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.containerBtnLogoft} onPress={() => signOut()}>
                    <Image
                    source={require('../../../assets/Image/logout.png')}
                    style={styles.imgLogoft}/>
                    <Text style={styles.btnLogoft}>Sair da conta</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.txtVersao}>Versão 1.0.0</Text>
            </View>


        </View>
        </View>
  );
}

const EditarPerfil=({navigation})=>{
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const { id, signOut } = useAuth()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await api.post('/user', {userid: id});
      setNomeCompleto(data.name)
      setEmail(data.email)
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  const onPressVerification = () => {
    if (senha != confirmaSenha) {
      Alert.alert('Erro', 'Ambas as senhas precisam ser iguais');
    } else {
      updateUser();
    }
  };

  const updateUser = () => {
    if (!nomeCompleto || !email || !senha || !confirmaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      api.post('/updateUser', {
        userid: id,
        name: nomeCompleto,
        email: email,
        password: senha
      });
      Alert.alert('Usuario', 'Cadastro atualizado com sucesso');
      signOut();
    } catch (error) {
      Alert.alert('Erro ao atualizar o usuário', error.message);
    }
  }

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          placeholder="Nome Completo"
          style={styles.inputs}
          value={nomeCompleto}
          onChangeText={(text) => setNomeCompleto(text)}></TextInput>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.inputs}
          value={email}
          onChangeText={(text) => setEmail(text)}></TextInput>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite a nova senha"
          style={styles.inputs}
          value={senha}
          onChangeText={(text) => setSenha(text)}></TextInput>

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          placeholder="Confirmar nova senha"
          style={styles.inputs}
          value={confirmaSenha}
          onChangeText={(text) => setConfirmaSenha(text)}></TextInput>
        
        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={() => onPressVerification()}>
          <Text style={styles.TxtbtnCadastrar}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCadastrar2}
          onPress={() => navigation.goBack()}>
          <Text style={styles.TxtbtnCadastrar}>Voltar</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
  }

//***********************************Navegação************************************ */

const Pilha = createNativeStackNavigator()

export default function NavegarTelasUser(){
  
    return(
        <>
        <Title title='Perfil'/>
        <Pilha.Navigator initialRouteName="user">
                <Pilha.Screen
                    name='user'
                    component={TelaUsuario}
                    options={{headerShown: false}}>
                </Pilha.Screen>

                    <Pilha.Screen
                        name='EditInfoUser'
                        component={EditarPerfil}
                        options={{headerShown: false}}>
                    </Pilha.Screen>
        </Pilha.Navigator>
      </>
       
    )
}

//***************************************Estilos************************************/
const styles = StyleSheet.create({
  textoGerenciarCard: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight:'bold',
  },

  GerenciarCard: {
    backgroundColor: '#236B8E',
    flex: 1,
  },

  GerenciarCard1: {
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },

  AddCreditCard: {
    backgroundColor: '#236B8E',
    flex: 1,
  },

  AddCreditCard1: {
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },

  background: {
    backgroundColor: '#236B8E',
    flex: 1,
  },

  background1: {
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },

  imagemUser: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },

  ContainerInfoUser: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 60,
    borderRadius: 10,
    height: 140,
    elevation: 8,
  },

  ContainerInfoCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    height: 450,
    elevation: 8,
  },

  txtEditInfo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    marginLeft: 30,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginRight: 30,
  },

  txtEditInfo2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  btnLogoft: {
    color: '#236B8E',
    fontSize: 20,
    fontWeight: 'bold',
  },

  containerBtnLogoft: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  txtVersao: {
    alignSelf: 'center',
    marginTop: 20
  },

  imgLogoft: {
    marginRight: 10,
    tintColor: '#236B8E'
  },

  imagemCardCredit:{
    width:150,
    height:150,
    alignSelf:'center'
  },

  btnAddcard:{
    backgroundColor:'#F26430',
    marginTop:120,
    margin:30,
    borderRadius:10,
    height:45,
    alignItems:'center',
    justifyContent:'center'
  },

  txtBtnAddCard:{
    fontSize:20,
    color:'#fff',
  },

  containerBtn:{
    flexDirection:'row',
    gap:16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop:20
  },

  txtBtnAdd:{
    color:'white',
    fontSize:17,
    alignSelf:'center',
  },

  txtBtnCancelar:{
    color:'#F26430',
    fontSize:17,
    alignSelf:'center',
  },

  btnCancelar:{
    backgroundColor:'white',
    width:100,
    borderRadius:25,
    borderColor:'#F26430',
    borderWidth:1,
    width:110,
    height:35, 
    justifyContent:'center',
    alignItems:'center'
  },

  btnAdd:{
    backgroundColor:'#F26430',
    width:100,
    borderRadius:25,
    width:110,
    height:35, 
    justifyContent:'center',
    alignItems:'center',
    marginRight:15
  },

  InputsAddCard: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#555',
    margin: 15,
    marginLeft: 30,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginRight: 30,
  },

  radioCard:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },

  txtRadioCard:{
    fontSize:20,
    paddingRight: 10,
    fontWeight: 'bold',
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },

  label: {
    fontSize: 18,
    width: 330,
    height: 20,
    alignSelf: 'center',
  },

  inputs: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    height: 60,
    marginBottom: 20,
    alignSelf: 'center',
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
    width: 350,
    marginTop: 20,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
  },

  btnCadastrar2: {
    backgroundColor: '#236B8E',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 20,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
  },
  scrollView: {
    paddingTop: '5%',
  },
});




