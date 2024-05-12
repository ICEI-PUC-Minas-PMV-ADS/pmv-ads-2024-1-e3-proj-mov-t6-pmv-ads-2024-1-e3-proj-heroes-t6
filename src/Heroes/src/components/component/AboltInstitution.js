import {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Modal, Button} from 'react-native';
import CommentCards from './CommentCards';

export default function ModalAboltInstituition(props) {

  const [ModalInstitution, setModalInstitution] = useState(false);

  const OpenModalInstitution = () => {
    setModalInstitution(true);
  };

  return (
    <ScrollView>
         
        <View style={estilos.container}>
          <TouchableOpacity
              style={estilos.cardInstituicao}
                onPress={() => {
                  OpenModalInstitution()}}>
                  <Image source={props.imageCard}
                style={estilos.imagemCard}/>
              <Text style={estilos.txtCard}>{props.institution}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Modal animationType="fade" visible={ModalInstitution}>
            <View style={estilos.modal}>
              <View>
               <TouchableOpacity 
                  style={estilos.containerBtnFechar}
                  onPress={() => {
                  setModalInstitution(false)}}>
                <Text style={estilos.btnFechar}>X</Text>
               </TouchableOpacity>
              </View>
              <Text style={estilos.tituloDoCard}>{props.institution}</Text>

        <CommentCards/>
            </View>
          </Modal>
        </View>

    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  cardInstituicao: {
    borderWidth: 1,
    borderColor: '#bbb',
    width: 300,
    height: 100,
    backgroundColor: '#eee',
    elevation: 8,
    marginTop: 40,
    borderRadius: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCard: {
    textAlign: 'center',
    fontSize: 15,
    borderTopWidth: 1,
    borderColor: '#bbb',
  },
  imagemCard: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: -30,
  },


  modal: {
    backgroundColor: '#eee',
    margin: 10,
    height: '97%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
  },

  containerBtnFechar: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    padding:7,
    backgroundColor:'#236B8E',

    margin:10
  },

  btnFechar:{
    textAlign:"center",
    fontSize:20,
    color:'#fff',
    fontWeight:"bold"
  },

  comentarioUsuario: {
    marginLeft: 10,
    color: '#000',
    marginTop: 5,
  },
  
  tituloDoCard:{
    fontWeight:'bold',
    color:'#000',
    fontSize:25,
    alignSelf:'center'
  }
});
