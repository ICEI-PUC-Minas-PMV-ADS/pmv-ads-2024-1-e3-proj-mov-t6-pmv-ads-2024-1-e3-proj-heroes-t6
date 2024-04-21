import {View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight, Alert, TextInput, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Title from '../component/Title';
import { useAuth } from '../services/AuthProvider'

//**************************** Telas ************************************ */
const TelaUsuario=({navigation})=> {
    const { signOut } = useAuth()
    return (
        <View style={estilos.background}>
        <View style={estilos.background1}>

            <View>
                <Image
                source={require('../../../assets/Image/user.png')}
                style={estilos.imagemUser}/>
            </View>

                <View style={estilos.ContainerInfoUser}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('EditInfoUser')}}>
                    <Text style={estilos.txtEditInfo}>Editar informações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{navigation.navigate('CartaoCredito')}}>
                    <Text style={estilos.txtEditInfo}>Cartões</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{ModalRemoverConta()}}>
                    <Text style={estilos.txtEditInfo2}>Remover minha conta</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={estilos.containerBtnLogoft} onPress={() => signOut()}>
                    <Image
                    source={require('../../../assets/Image/logout.png')}
                    style={estilos.imgLogoft}/>
                    <Text style={estilos.btnLogoft}>Sair da conta</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={estilos.txtVersao}>Versão 1.0.0</Text>
            </View>


        </View>
        </View>
  );
}

const EditarPerfil=({navigation})=>{
  return(
    <View>
      <Text>Tela editar perfil</Text>
    </View>
  )
  }

  const EditarcartaoCredito=({navigation})=>{
    return(
      <View style={estilos.GerenciarCard}>
        <View style={estilos.GerenciarCard1}>
            <View>
              <Image source={require('../../../assets/Image/Card_credit.png')} style={estilos.imagemCardCredit}/>
            </View>

            <View>
              <Text style={estilos.textoGerenciarCard}>Gerenciar cartoes</Text>
            </View>

            <View>
              <View style={estilos.ContainerInfoUser}>
                <TouchableOpacity style={estilos.btnAddcard} onPress={()=>{navigation.navigate('AddcartaoCredito')}}>
                  <Text style={estilos.txtBtnAddCard}>+  Adicionar novo cartao</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
    )
    }

    const ModalRemoverConta=()=>{
      return(
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
            onPress: () => {
          console.log("Usuário escolheu Confirmar");
              }
                 }
             ]
                )
            )
     }

const AddCartaoCredito=({navigation})=>{

  const [titular, setTitular]=useState('')
  const [numeroCartao, setNumeroCartao]=useState('')
  const [dataValidade, setdataValidade]=useState('')
  const [cvv, setCvv]=useState('')
  const[checked, setChecked]=useState('')

    return(
      <View style={estilos.AddCreditCard}>
        <View style={estilos.AddCreditCard1}>
           <View>
            <Image source={require('../../../assets/Image/Card_credit.png')} style={estilos.imagemCardCredit}></Image>
           </View>
           <View>
               <View style={estilos.ContainerInfoCard}>

                  <View style={estilos.radioCard}>
                    <RadioButton
                        value='first'
                        color={'#236B8E'}
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={()=>{setChecked('first')}}>
                    </RadioButton>
                     <Text style={estilos.txtRadioCard}>Visa</Text>

                          <RadioButton
                              value='first'
                              color={'#236B8E'}
                              status={checked === 'second' ? 'checked' : 'unchecked'}
                              onPress={()=>{setChecked('second')}}>
                          </RadioButton>
                            <Text style={estilos.txtRadioCard}>Elo</Text>

                    <RadioButton
                        value='first'
                        color={'#236B8E'}
                        status={checked === 'third' ? 'checked' : 'unchecked'}
                        onPress={()=>{setChecked('third')}}>
                    </RadioButton>
                      <Text style={estilos.txtRadioCard}>MasterCard</Text>
                </View>

          <View>
                <TextInput 
                  style={estilos.InputsAddCard}
                  placeholder='Nome do titular'
                  onChangeText={text=>{setTitular(text)}}>
                </TextInput>

                    <TextInput 
                      style={estilos.InputsAddCard}
                      placeholder='Numero do cartao'
                      onChangeText={text=>{setNumeroCartao(text)}}
                      keyboardType='numeric'>
                    </TextInput>

                    <TextInput 
                      style={estilos.InputsAddCard}
                      placeholder='Data de validade'
                      onChangeText={text=>{setdataValidade(text)}}
                      keyboardType='numeric'>
                    </TextInput>

                <TextInput 
                  style={estilos.InputsAddCard}
                  placeholder='CVV'
                  onChangeText={text=>{setCvv(text)}}
                  keyboardType='numeric'>
                </TextInput>
          </View>
              
              <View style={estilos.containerBtn}>
                  <TouchableOpacity style={estilos.btnCancelar} onPress={()=>{navigation.navigate('AddcartaoCredito')}}>
                    <Text style={estilos.txtBtnCancelar}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={estilos.btnAdd} onPress={()=>{navigation.navigate('AddcartaoCredito')}}>
                    <Text style={estilos.txtBtnAdd}>Adicionar</Text>
                  </TouchableOpacity>
              </View>
            
            </View>
          </View>
      </View>
    </View>
  )
}

//******************************************************************************* */

const Pilha = createNativeStackNavigator()

export default function NavegarTelasUser(){
  
    return(
        <>
        <Title title='Home'/>
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

                    <Pilha.Screen
                        name='CartaoCredito'
                        component={EditarcartaoCredito}
                        options={{headerShown: false}}>
                    </Pilha.Screen>

                <Pilha.Screen
                    name='AddcartaoCredito'
                    component={AddCartaoCredito}
                    options={{headerShown: false}}>
                </Pilha.Screen>

        </Pilha.Navigator>
      </>
       
    )
}

const estilos = StyleSheet.create({
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
    height: 180,
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
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
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
    marginTop: 10,
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
    marginTop: 100,
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
}
});




