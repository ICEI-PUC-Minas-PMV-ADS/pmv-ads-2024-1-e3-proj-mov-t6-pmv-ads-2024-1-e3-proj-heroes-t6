import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Modal, FlatList, StyleSheet, Image } from 'react-native';
import api from '../../api/api';
import ModalAboltInstituition from './AboltInstitution';
import PopUpAvaliacao from '../screens/PopUpAvaliacao';

export default function CardInstitution() {
  const [modalVisibleInst, setModalVisibleInst] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    if (modalVisibleInst) {
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
  }, [modalVisibleInst]);

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

  return (
    <View style={styles.container}>
      <PopUpAvaliacao />
      <View>
        <TouchableOpacity onPress={() => setModalVisibleInst(true)}>
          <Text style={styles.buttonText}>Nossas Avaliações</Text>
        </TouchableOpacity>
      </View>
      <ModalAboltInstituition />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleInst}
        onRequestClose={() => setModalVisibleInst(false)}
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
                  {renderStars(item.stars)}
                </View>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisibleInst(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height:'50%'
  },
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
});
