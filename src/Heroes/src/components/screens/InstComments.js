import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import api from '../../api/api';
import { useAuth } from '../services/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CommentCards({ institutionId, setDetailsModalVisible }) {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [name, setName] = useState('');
  const { id } = useAuth();

  useEffect(() => {
    fetchName();
    loadComments();
  }, []);

  const addComment = () => {
    if (comentario !== '') {
      if (name) {
        api.post('/addComment', { comment: comentario, userId: id, userName: name, institutionId })
          .then(() => {
            Alert.alert('Sucesso',`Comentário criado com sucesso.`);
            setComentario('');
            loadComments();
          })
          .catch(error => console.error('Erro ao adicionar comentário:', error));
      } else {
        console.error('Nome do usuário não foi carregado.');
      }
    } else {
      Alert.alert('Erro','Preencha o campo "Escrever comentário".');
    }
  };

  const loadComments = () => {
    api.get('/getCommentsByInstitution', { params: { institutionId } })
      .then(response => {
        setComentarios(response.data);
      })
      .catch(error => console.error('Erro ao carregar comentários:', error));
  };

  const deleteComment = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar', onPress: () => {
            api.post('/deleteComment', { id })
              .then(() => loadComments())
              .catch(error => console.error('Erro ao excluir comentário:', error));
          }
        },
      ]
    );
  };

  const toggleEdit = (id) => {
    const updatedComments = comentarios.reverse().map(comment => {
      if (comment.id === id) {
        return { ...comment, editable: !comment.editable };
      }
      return comment;
    });
    setComentarios(updatedComments);
  };

  const saveComment = (id, newText) => {
    api.post('/updateComment', { id, comment: newText })
      .then(() => {
        Alert.alert('Sucesso',`Comentário editado com sucesso.`);
        loadComments()})
      .catch(error => console.error('Erro ao editar comentário:', error));
  };

  const fetchName = async () => {
    try {
      const { data } = await api.post('/user', { userid: id });
      setName(data.name);
      console.log('Nome do usuário:', data.name);
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
    }
  };

  useEffect(() => {
    console.log('ID do usuário autenticado:', id); // Log para verificar o ID do usuário autenticado
  }, [id]);

  return (
    <View>
      <TextInput
        value={comentario}
        style={styles.textInput}
        maxLength={150}
        multiline={true}
        placeholder="Escrever comentário:"
        onChangeText={(text) => setComentario(text)}
      />
      <TouchableOpacity onPress={addComment} style={styles.btnEnviar}>
        <Text style={{ color: 'white', fontSize: 20 }}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setDetailsModalVisible(false)}
                  style={styles.btnVoltar}>
                  <Text style={{color: 'white', fontSize: 20}}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Lista de Comentários</Text>
      
      {comentarios.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum comentário disponível</Text>
                        ) : (
        comentarios.reverse().map((item) => (
          <View key={item.id.toString()} style={styles.commentContainer}>
            <Text style={styles.userName}>{item.userName}</Text>
            <View>
              {item.editable ? (
                <TextInput
                  style={styles.textInput}
                  value={item.text}
                  maxLength={150}
                  multiline={true}
                  onChangeText={(text) => {
                    const updatedComments = comentarios.reverse().map(comment => {
                      if (comment.id === item.id) {
                        return { ...comment, text: text };
                      }
                      return comment;
                    });
                    setComentarios(updatedComments);
                  }}
                />
              ) : (
                <Text style={styles.textComment}>
                  {item.text}
                </Text>
              )}

            </View>
            {item.userId == id && (
  <View style={styles.buttonsContainer}>
    {item.editable ? (
      <TouchableOpacity onPress={() => saveComment(item.id, item.text)}>
        <Icon name={'content-save'} size={20} color='#F26430' />
      </TouchableOpacity>
    ) : (
      <>
        <TouchableOpacity onPress={() => toggleEdit(item.id)}>
          <Icon name={'pencil'} size={20} color='gray' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteComment(item.id)}>
          <Icon name={'trash-can-outline'} size={20} color='gray' />
        </TouchableOpacity>
      </>
    )}
  </View>
)}
          </View>
        )))}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
        fontSize: 20,
        width: 330,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
  },
  commentContainer: {
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
  userName:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
  },
  textComment:{
    fontSize: 18,
    textAlign: 'justify',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
  },

  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: '5%',
    alignSelf: 'flex-end',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  btnEnviar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#F26430',
  },
  btnVoltar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginBottom: 40,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#236B8E',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 330,
    height: 25,
    marginBottom: 10,
    alignSelf: 'center',
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 15,
    color: 'gray',
  },
});