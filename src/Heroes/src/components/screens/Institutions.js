import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import IntComments from '../screens/InstComments'
import api from '../../api/api';
import {useAuth} from '../services/AuthProvider';
import Title from '../component/Title';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalAboltInstituition() {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [institutionDesc, setInstitutionDesc] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState('1'); // ID do usuário atual
  const {id} = useAuth();

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
          Alert.alert('Sucesso',`Instituição ${isEditing ? 'atualizada' : 'criada'} com sucesso.`);
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
      Alert.alert('Erro','Preencha todos os campos.');
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
      <Text style={styles.titleInst}>Instituições Parceiras</Text>
      {id === userId && (
        <TouchableOpacity
          onPress={() => {
            setSelectedInstitution(null);
            setIsEditing(false);
            setModalVisible(true);
          }}
          style={styles.btnAddInst}>
            <Icon name={'plus'} size={20} color='white' />
            <Text style={{color: 'white', fontSize: 20, textAlign:'center'}}> 
              Nova Instituição
            </Text>
        </TouchableOpacity>
      )}

      {institutions.reverse().map((item) => (
        
        <TouchableOpacity 
          key={item.id.toString()} 
          style={styles.institutionCard}
          onPress={() => onViewPress(item)}>
          <ImageBackground
            source={require('../../../assets/Image/fundo2.png')}
            imageStyle={styles.cardImage}>

            <Text style={styles.institutionTitle}>{item.name}</Text>

          {id === userId && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => onEditPress(item)}>
                <Icon name={'pencil'} size={23} color='white' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteInstitution(item.id)}>
                <Icon name={'trash-can-outline'} size={23} color='white' />
              </TouchableOpacity>
            </View>
          )}
          </ImageBackground>
        </TouchableOpacity>
      ))}

      {modalVisible && id === userId && (
        <Modal visible={modalVisible} animationType="slide">
          <Title title={isEditing ? 'Editar Instituição' : 'Adicionar Instituição'} />
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
                  multiline={true}
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

      {detailsModalVisible && selectedInstitution && (
  <Modal visible={detailsModalVisible} animationType="slide">
    <Title title={selectedInstitution.name}/>
    <View style={styles.background}>
      <ScrollView style={styles.background2}>
        <View style={styles.container2}>

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.txtDescription}>
            {selectedInstitution.description}
          </Text>
          <Text style={styles.label}>Comente sobre a instituição</Text>

          <IntComments
            institutionId={selectedInstitution.id}
            setDetailsModalVisible={setDetailsModalVisible}
          />

        </View>
      </ScrollView>
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
  container2: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '5%',
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
  TxtbtnCancelar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#236B8E',
  },
  btnAddInst: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 340,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#F26430',
  },
  institutionCard: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ffff',
    overflow: 'hidden',
    elevation: 10,
    height: 90,
    width: 340,
    alignSelf: 'center',
  },
  institutionTitle: {
    marginTop: 30,
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputs: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
      flexDirection: 'row',
        position: 'absolute',
        marginLeft: '5%',
        alignSelf: 'flex-end',
  },
  background: {
    backgroundColor: '#236B8E',
    flex: 1,
  },
  background1: {
    paddingTop: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  background2: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleInst:{
      fontSize: 20,
      fontWeight: 'bold',
      width: 330,
      height: 25,
      marginBottom: 20,
      alignSelf: 'center',
      textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 330,
    height: 25,
    alignSelf: 'center',
  },
  txtDescription: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'justify',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 45,
    marginRight: 45,
    color: 'black',
  },
  cardImage: {
    alignSelf: 'center',
    position: 'absolute',
    height: 120,
    width: '100%',
    opacity: 0.75,
},
});
