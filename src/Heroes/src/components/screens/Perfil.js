import {View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight, Alert, TextInput} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper';

//**************************** Telas ************************************ */
const TelaUsuario=({navigation})=> {
  return (
    <View style={estilos.background}>

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
                <Text style={estilos.txtEditInfo}>Remover minha conta</Text>
             </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity style={estilos.containerBtnLogoft}>
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
      <View>
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
        <View>
           <View>
            <Image source={require('../../../assets/Image/Card_credit.png')} style={estilos.imagemCardCredit}></Image>
           </View>
           <View>
               <View style={estilos.ContainerInfoCard}>

                  <View style={estilos.radioCard}>
                    <RadioButton
                        value='first'
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={()=>{setChecked('first')}}>
                    </RadioButton>
                     <Text style={estilos.txtRadioCard}>Visa</Text>

                          <RadioButton
                              value='first'
                              status={checked === 'second' ? 'checked' : 'unchecked'}
                              onPress={()=>{setChecked('second')}}>
                          </RadioButton>
                            <Text style={estilos.txtRadioCard}>Elo</Text>

                    <RadioButton
                        value='first'
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
  )
}

//******************************************************************************* */

const Pilha = createNativeStackNavigator()

export default function NavegarTelasUser(){
  
    return(
    
      <Pilha.Navigator initialRouteName="user">
            <Pilha.Screen
                name='user'
                component={TelaUsuario}
                options={{title:'Dados do usuário'}}>
            </Pilha.Screen>

                  <Pilha.Screen
                      name='EditInfoUser'
                      component={EditarPerfil}
                      options={{title:'Editar Usuario'}}>
                  </Pilha.Screen>

                  <Pilha.Screen
                      name='CartaoCredito'
                      component={EditarcartaoCredito}
                      options={{title:'Editar cartão de crédito'}}>
                  </Pilha.Screen>

            <Pilha.Screen
                name='AddcartaoCredito'
                component={AddCartaoCredito}
                options={{title:'Adicionar cartão'}}>
            </Pilha.Screen>

      </Pilha.Navigator>
       
    )
}

const estilos = StyleSheet.create({
  textoGerenciarCard: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight:'bold',
  },

  background: {
    backgroundColor: '#eee',
    flex: 1,
  },

  imagemUser: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },

  ContainerInfoUser: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    height: 180,
    elevation: 8,
  },

  ContainerInfoCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    height: 430,
    elevation: 8,
  },

  txtEditInfo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#555',
    margin: 15,
    marginLeft: 30,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginRight: 30,
  },

  btnLogoft: {
    color: '#337593',
    fontSize: 20,
    fontWeight: 'bold',
  },

  containerBtnLogoft: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 150,
  },

  txtVersao: {
    alignSelf: 'center',
    marginTop: 100,
  },

  imgLogoft: {
    marginRight: 10,
  },

imagemCardCredit:{
  width:150,
  height:150,
  alignSelf:'center'
},

btnAddcard:{
  backgroundColor:'#f4693a',
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
  color:'#f4693a',
  fontSize:17,
  alignSelf:'center',

},
btnCancelar:{
  backgroundColor:'white',
  width:100,
  borderRadius:25,
  borderColor:'#f4693a',
  borderWidth:1,
  width:110,
  height:35, 
 justifyContent:'center',
 alignItems:'center'
},

btnAdd:{
  backgroundColor:'#f4693a',
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
},

txtRadioCard:{
  fontSize:16
}
});
