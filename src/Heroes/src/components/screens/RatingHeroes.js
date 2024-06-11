import React, { useState, useEffect } from 'react';
import { View, Image, Modal, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Alert, ScrollView } from 'react-native';
import RatingBar from '../component/RatingBar';
import api from '../../api/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '../services/AuthProvider';
import Title from '../component/Title';

export default function AvaliacaoHeroes() {
    const {id}= useAuth()
    const [modalList, setModalList] = useState(false);
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [comment, setComment] = useState('');
    const [idComment, setIdComment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
      fetchName();
      loadComentarios();
    }, []);

    const fetchName = async () => {
      try {
        const { data } = await api.post('/user', { userid: id });
        setName(data.name);
        console.log('Nome do usuário:', data.name);
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    const loadComentarios = async () => {
      try {
        const response = await api.get('/getAllCommentsHeroes');
        setComentarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    };

    const addOrUpdateComment = () => {
      if (comment && defaultRating) {
        const endpoint = isEditing ? '/updateCommentHeroes' : '/addCommentHeroes';
        api
          .post(endpoint, {
            comment: comment,
            userId: id,
            stars: defaultRating,
            id: idComment,
            userName: name,
          })
          .then(() => {
            Alert.alert('Sucesso',`Avaliação ${isEditing ? 'atualizada' : 'criada'} com sucesso.`);
            setComment('');
            setDefaultRating(1);
            setIsEditing(false);
            setModalAvaliacao(false);
            loadComentarios();
          })
          .catch(error =>
            console.error(
              `Erro ao ${isEditing ? 'atualizar' : 'adicionar'} Avaliação:`,
              error,
            ),
          );
      } else {
        Alert.alert('Preencha todos os campos');
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
      setComment(item.text);
      setDefaultRating(item.stars);
      setIdComment(item.id);
      setIsEditing(true);
      setModalAvaliacao(true);
    };

    const handleCreateButtonPress = () => {
      setComment('');
      setDefaultRating(1);
      setIdComment('');
      setIsEditing(false);
      setModalAvaliacao(true);
    };

    const renderStars = (stars) => {
      const starIcons = [];
      for (let i = 1; i <= 5; i++) {
        starIcons.push(
          <Image
            key={i}
            style={styles.starImageStyle}
            source={
              i <= stars
                ? require('../../../assets/Image/star_filled.png')
                : require('../../../assets/Image/star_corner.png')
            }
          />
        );
      }
      return <View style={styles.starContainer}>{starIcons}</View>;
    };

    return (
      <>
        <View style={styles.mainContainer}>

          <TouchableOpacity style={styles.btnAvaliacao} onPress={() => setModalList(true)}>
            <Text style={{color:'#fff', fontSize: 20}}>⭐ Avalie o Heroes</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            visible={modalList}
            onRequestClose={() => setModalList(false)}>

            <Title title={'Nossas Avaliações'}/>
            <View style={styles.background}>
              <ScrollView style={styles.background2}>
                <View style={styles.container2}>


                <TouchableOpacity onPress={() => handleCreateButtonPress()} style={styles.btnNovaAvaliacao}>
                  <Icon name={'plus'} size={20} color='white' />
                  <Text style={{color:'#fff', fontSize: 20}}> Nova Avaliação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalList(false)}>
                  <Text style={{color: 'white', fontSize: 20}}>Voltar</Text>
                </TouchableOpacity>

                {comentarios.length === 0 ? (
                            <Text style={styles.emptyText}>Nenhuma avaliação disponível</Text>
                        ) : (
                comentarios.reverse().map((item) => (
                  <View
                    key={item.id.toString()} 
                    style={styles.commentCard}>
                      <View style={styles.userContainer}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        {renderStars(item.stars)}
                      </View>

                      <Text style={styles.textComment}>{item.text}</Text>

                    {item.userId.toString() === id && (
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handleEditButtonPress(item)}>
                          <Icon name={'pencil'} size={20} color='gray' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton} onPress={() => {
                                                    Alert.alert(
                                                        "Remover Avaliação", 
                                                        "Tem certeza que deseja apagar esta avaliação?", 
                                                        [
                                                            {
                                                                text: "Cancelar",
                                                                onPress: () => {},
                                                                style: "cancel"
                                                            },
                                                            { 
                                                                text: "Confirmar", 
                                                                onPress: () => handleDeleteComment(item.id)
                                                            }
                                                        ]
                                                    )
                                                }}>
                          <Icon name={'trash-can-outline'} size={20} color='gray' />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )))}
              </View>
            </ScrollView>
            </View>
          </Modal>
          
          <Modal visible={modalAvaliacao} animationType="slide">
            <Title title={isEditing ? 'Editar Avaliação' : 'Nova Avaliação'} />
            <View style={styles.background}>
            <View style={styles.background1}>
              <ScrollView>
                <RatingBar
                  defaultRating={defaultRating} 
                  setDefaultRating={setDefaultRating} 
                  maxRating={maxRating} 
                />

                <TextInput
                  style={styles.inputs}
                  placeholder="Escreva seu comentário aqui..."
                  value={comment}
                  onChangeText={setComment}
                  maxLength={150}
                  multiline={true}
                />

                  <TouchableOpacity
                    style={styles.TxtbtnSalvar}
                    onPress={() => addOrUpdateComment()}>
                      <Text style={{color: 'white', fontSize: 20}}>{isEditing ? 'Editar' : 'Adicionar'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.TxtbtnCancelar}
                    onPress={() => setModalAvaliacao(false)}>
                      <Text style={{color: 'white', fontSize: 20}}>Cancelar</Text>
                  </TouchableOpacity>
              </ScrollView>
              </View>
              </View>
          </Modal>
        </View>
      </>
    );
  }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    btnAvaliacao:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    marginBottom: 30,
    borderRadius: 20,
    height: 50,
    fontSize: 60,
    backgroundColor: '#236B8E',
    },
    btnNovaAvaliacao:{
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
    buttonText: {
      fontSize: 18,
      color: '#007BFF',
      padding: 10,
      textAlign: 'center'
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
    commentCard: {
      borderRadius: 10,
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: '#ffff',
          overflow: 'hidden',
          alignSelf:'center',
          width: 340,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 340,
        marginBottom: 20,
        borderRadius: 20,
        flexDirection: 'row',
        height: 50,
        alignSelf: 'center',
        fontSize: 60,
        backgroundColor: '#236B8E',
    },
    starImageStyle: {
      width: 20,
      height: 20,
      resizeMode: 'cover',
    },
    container2: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      paddingTop: '5%',
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
    userName:{
      fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
    },
    starContainer: {
      marginTop: 10,
      marginLeft: 10,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: 'none',
    },
    textComment:{
      fontSize: 18,
      lineHeight: 21,
      textAlign: 'justify',
      alignSelf: 'flex-start',
      marginBottom: 20,
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      color: 'black',
    },
    buttonsContainer: {
      marginTop: 10,
        flexDirection: 'row',
          position: 'absolute',
          marginLeft: '5%',
          alignSelf: 'flex-end',
    },
    userContainer: {
      alignSelf: 'left',
      flexDirection: 'row',
    },
    inputs: {
      borderBottomWidth: 1,
      fontSize: 20,
      width: 330,
      marginBottom: 20,
      alignSelf: 'center',
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
    emptyText: {
      alignSelf: 'center',
      marginTop: 20,
      fontSize: 15,
      color: 'gray',
    },
});