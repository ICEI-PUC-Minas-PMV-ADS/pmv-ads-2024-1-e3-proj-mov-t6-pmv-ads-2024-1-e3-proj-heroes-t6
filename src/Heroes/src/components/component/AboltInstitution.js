import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import CommentCards from './CommentCards';
import api from '../../api/api';
import {useAuth} from '../services/AuthProvider';
import Title from '../component/Title';

export default function ModalAboltInstituition() {
  const [modalVisible, setModalVisible] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [institutionDesc, setInstitutionDesc] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState('1'); // ID do usuário atual
  const {id} = useAuth();
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    loadInstitutions();
  }, []);

  const onEditPress = item => {
    setInstitutionName(item.name);
    setInstitutionDesc(item.description);
    setSelectedInstitution(item);
    setIsEditing(true);
    setModalVisible(true);
    setDetailsModalVisible(false);
  };

  const onViewPress = item => {
    setSelectedInstitution(item);
    setDetailsModalVisible(true);
    setModalVisible(false);
  };

  const loadInstitutions = () => {
    api
      .get('/getAllInstituicoes')
      .then(response => setInstitutions(response.data))
      .catch(error => console.error('Erro ao carregar instituições:', error));
  };

  const addOrUpdateInstitution = () => {
    if (institutionName && institutionDesc) {
      const endpoint = isEditing ? '/updateInstituicao' : '/addInstituicao';
      api
        .post(endpoint, {
          id: selectedInstitution?.id,
          name: institutionName,
          description: institutionDesc,
        })
        .then(() => {
          setInstitutionName('');
          setInstitutionDesc('');
          setIsEditing(false);
          setModalVisible(false);
          setSelectedInstitution(null);
          loadInstitutions();
        })
        .catch(error =>
          console.error(
            `Erro ao ${isEditing ? 'atualizar' : 'adicionar'} instituição:`,
            error,
          ),
        );
    } else {
      alert('Preencha todos os campos');
    }
  };

  const deleteInstitution = id => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta instituição?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Confirmar',
          onPress: () => {
            api
              .post('/deleteInstituicao', {id})
              .then(() => loadInstitutions())
              .catch(error =>
                console.error('Erro ao excluir instituição:', error),
              );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {id === userId && (
        <TouchableOpacity
          onPress={() => {
            setSelectedInstitution(null);
            setIsEditing(false);
            setModalVisible(true);
          }}
          style={styles.btnAddInst}>
          <Text style={{color: 'white', fontSize: 20}}>
            Adicionar Instituição
          </Text>
        </TouchableOpacity>
      )}
      {institutions.map((item) => (
        <View key={item.id.toString()} style={styles.institutionCard}>
          <TouchableOpacity onPress={() => onViewPress(item)}>
            <Text style={styles.institutionTitle}>{item.name}</Text>
          </TouchableOpacity>
          {id === userId && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => onEditPress(item)}>
                <Image
                  source={require('../../../assets/Image/edit.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteInstitution(item.id)}>
                <Image
                  source={require('../../../assets/Image/delete.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {detailsModalVisible && selectedInstitution && (
        <Modal visible={detailsModalVisible} animationType="slide">
          <View style={styles.background}>
            <Text style={styles.institutionTitle2}>
              {selectedInstitution.name}
            </Text>
            <View style={styles.background1}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedInstitution(null);
                  setDetailsModalVisible(false);
                }}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
              <ScrollView>
                <Text style={{fontSize: 17, marginBottom: 10}}>
                  {selectedInstitution.description}
                </Text>

                <CommentCards institutionId={selectedInstitution.id} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
      {modalVisible && id === userId && (
        <Modal visible={modalVisible} animationType="slide">
          <Title title='Adicionar Instituição' />
          <View style={styles.background}>
            <View style={styles.background1}>
              <ScrollView>
                <TextInput
                  placeholder="Nome da Instituição"
                  value={institutionName}
                  onChangeText={setInstitutionName}
                  style={styles.inputs}
                />
                <TextInput
                  placeholder="Descrição"
                  value={institutionDesc}
                  onChangeText={setInstitutionDesc}
                  style={styles.inputs}
                />
                <TouchableOpacity
                  onPress={addOrUpdateInstitution}
                  style={styles.TxtbtnSalvar}>
                  <Text style={{color: 'white', fontSize: 20}}>
                    {isEditing ? 'Atualizar' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setIsEditing(false);
                    setInstitutionName('');
                    setInstitutionDesc('');
                  }}
                  style={styles.TxtbtnCancelar}>
                  <Text style={{color: 'white', fontSize: 20}}>Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  TxtbtnSalvar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 30,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#F26430',
  },

  btnAddInst: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#F26430',
  },
  TxtbtnCancelar: {
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
  institutionCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  institutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  institutionTitle2: {
    fontSize: 22,
    backgroundColor: '#236B8E',
    margin: 15,
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  inputs: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    height: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  closeButton: {
    color: 'red',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  background: {
    backgroundColor: '#236B8E',
    flex: 1,
  },
  background1: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
});
