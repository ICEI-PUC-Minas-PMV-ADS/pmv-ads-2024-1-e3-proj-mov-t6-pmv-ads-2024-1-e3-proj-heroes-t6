import {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function CardInstitution() {
  const [ModalBombeiros, setModalBombeiros] = useState(false);
  const [ModaleSolidar, setModaleSolidar] = useState(false);
  const [Comentario, setComentario] = useState('');
  const [txt, setTxt] = useState('');

  const OpenModalBombeiros = () => {
    setModalBombeiros(true);
  };

  const OpenModaleSolidar = () => {
    setModaleSolidar(true);
  };

  const BtnEnviarComentario = text => {
    setTxt(text);
  };
  return (
    <ScrollView>
      <View>
        <View style={estilos.container}>
          <TouchableOpacity
            style={estilos.cardInstituicao}
            onPress={() => {
              OpenModalBombeiros();
            }}>
            <Image
              source={require('../../../assets/Image/bombeiros.png')}
              style={estilos.imagemCard}
            />
            <Text style={estilos.txtCard}>Bombeiros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.cardInstituicao}
            onPress={() => {
              OpenModaleSolidar();
            }}>
            <Image
              source={require('../../../assets/Image/eSolidar.png')}
              style={estilos.imagemCard}
            />
            <Text style={estilos.txtCard}>eSolidar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.cardInstituicao}>
            <Image
              source={require('../../../assets/Image/bombeiros.png')}
              style={estilos.imagemCard}
            />
            <Text style={estilos.txtCard}>Instituição A</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.cardInstituicao}>
            <Image
              source={require('../../../assets/Image/bombeiros.png')}
              style={estilos.imagemCard}
            />
            <Text style={estilos.txtCard}>Instituição B</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View>
          <Modal animationType="fade" visible={ModalBombeiros}>
            <View style={estilos.modal}>
              <View style={estilos.btnFechar}>
                <Button
                  title="X"
                  onPress={() => {
                    setModalBombeiros(false);
                  }}
                />
              </View>
              <Text>Bombeiros</Text>

              <View style={estilos.containerModal}>
                <View style={{borderTopWidth: 1, borderColor: '#aaa'}}>
                  <TextInput
                    style={estilos.textImput}
                    placeholder="Escrever comentário:"
                    onChangeText={text => {
                      BtnEnviarComentario(text);
                    }}
                    multiline={true}
                  />
                  <Button
                    title="Enviar"
                    onPress={() => {
                      setComentario(txt);
                    }}
                  />

                  <Text style={estilos.nomeUsuario}>[Usuario]</Text>
                  <View style={estilos.containerComentarios}>
                    <Text style={estilos.comentarioUsuario}>{Comentario}</Text>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../assets/Image/edit.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../assets/Image/delete.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View>
        <Modal animationType="fade" visible={ModaleSolidar}>
          <View style={estilos.modal}>
            <View style={estilos.btnFechar}>
              <Button
                title="X"
                onPress={() => {
                  setModaleSolidar(false);
                }}
              />
            </View>
            <Text>eSolidar</Text>
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

  containerModal: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '95%',
    height: '85%',
    marginTop: 20,
    borderRadius: 6,
  },
  modal: {
    backgroundColor: '#eee',
    margin: 10,
    height: '97%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
  },

  btnFechar: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    margin: 10,
  },

  textImput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
  },

  nomeUsuario: {
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
  },
  comentarioUsuario: {
    marginLeft: 10,
    color: '#000',
    marginTop: 5,
  },

  containerComentarios: {
    flexDirection: 'row',
    gap: 10,
  },
});
