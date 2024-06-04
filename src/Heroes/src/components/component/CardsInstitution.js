import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Modal, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import api from '../../api/api';
import ModalAboltInstituition from './AboltInstitution';
import PopUpAvaliacao from '../screens/PopUpAvaliacao';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '../services/AuthProvider';
import RatingBar from '../screens/RatingBar';

export default function CardInstitution() {
  const [modalVisible, setModalVisible] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const {id}= useAuth()
  const [modalAvaliacao, setModalAvaliacao] = useState(false);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [comentariosEdit, setComentariosEdit] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (modalVisible) {
      // Função para carregar comentários ao abrir o modal
      async function loadComentarios() {
        try {
          const response = await api.get('/getAllCommentsHeroes');
          setComentarios(response.data);
        } catch (error) {
          console.error('Erro ao carregar comentários:', error);
        }
      }
      loadComentarios();
    }
  }, [modalVisible]);

  const renderStars = (stars) => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <Image
          key={i}
          style={styles.starImageStyle}
          source={
            i <= stars
              ? require('../../../assets/Image/star_filled.jpg')
              : require('../../../assets/Image/star_corner.jpg')
          }
        />
      );
    }
    return <View style={styles.starContainer}>{starIcons}</View>;
  };

  const handleEditComment = async () => {
    try {
      await api.put('/updateCommentHeroes', {
        id: editId,
        comment: comentariosEdit,
        stars: defaultRating
      });
      setComentarios(comentarios.map(item => (item.id === editId ? { ...item, text: comentariosEdit, stars: defaultRating } : item)));
      setComentariosEdit('');
      setDefaultRating(2);
      setModalAvaliacao(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await api.post('/deleteCommentHeroes', { id: id });
      setComentarios(comentarios.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    }
  };

  const handleEditButtonPress = (item) => {
    setComentariosEdit(item.text);
    setDefaultRating(item.stars);
    setEditId(item.id);
    setModalAvaliacao(true);
  };

  return (
    <ScrollView>
      <PopUpAvaliacao />
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Avaliações Heroes</Text>
        </TouchableOpacity>
      </View>
      <ModalAboltInstituition />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Avaliações Heroes</Text>
            <FlatList
              data={comentarios}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text>{item.text}</Text>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleEditButtonPress(item)}>
                    <Icon name={'pencil'} size={28} color='gray' />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteComment(item.id)}>
                    <Icon name={'trash-can-outline'} size={28} color='gray' />
                  </TouchableOpacity>
                  {renderStars(item.stars)}
                </View>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType='fade' visible={modalAvaliacao} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>
              Classifique a sua experiência
            </Text>
            <RatingBar
              defaultRating={defaultRating}
              setDefaultRating={setDefaultRating}
              maxRating={maxRating}
            />
            <Text style={styles.textStyle}>
              {defaultRating} / {Math.max(...maxRating)}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Escreva seus comentários aqui..."
              placeholderTextColor="#888"
              value={comentariosEdit}
              onChangeText={setComentariosEdit}
              multiline={true}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={handleEditComment}
            >
              <Text style={styles.buttonTextStyle}>
                Enviar Comentário
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={() => setModalAvaliacao(false)}
            >
              <Text style={styles.buttonTextStyle}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: '#007BFF',
    padding: 10,
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#8ad24e',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    marginVertical: 10,
  },
  textInputStyle: {
    width: '100%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    textAlignVertical: 'top',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#8ad24e',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
});
