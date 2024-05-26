import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../api/api';

export default function Avaliacao() {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Função para carregar comentários ao montar o componente
    async function loadComentarios() {
      try {
        const response = await api.get('/getAllCommentsHeroes');
        setComentarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    }
    loadComentarios();
  }, []);

  const handleAddComment = async () => {
    try {
      const response = await api.post('/addCommentHeroes', {
        comment: comentario,
        userId: 1, // substituir pelo ID do usuário atual
        stars: defaultRating
      });
      setComentarios([...comentarios, response.data]);
      setComentario('');
      setDefaultRating(2);
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const handleEditComment = async () => {
    try {
      await api.put('/updateCommentHeroes', {
        id: editId,
        comment: comentario,
        stars: defaultRating
      });
      setComentarios(comentarios.map(item => (item.id === editId ? { ...item, text: comentario, stars: defaultRating } : item)));
      setComentario('');
      setDefaultRating(2);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await api.delete('/deleteCommentHeroes', { data: { id } });
      setComentarios(comentarios.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    }
  };

  const handleSubmit = () => {
    if (editMode) {
      handleEditComment();
    } else {
      handleAddComment();
    }
  };

  const handleEditMode = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setComentario(item.text);
    setDefaultRating(item.stars);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva seu comentário"
          onChangeText={setComentario}
          value={comentario}
        />
        <View style={styles.ratingContainer}>
          {maxRating.map((item, key) => (
            <TouchableOpacity
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Text style={{ color: item <= defaultRating ? 'gold' : 'gray' }}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{editMode ? 'Editar Comentário' : 'Adicionar Comentário'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item.text}</Text>
            <Text>{'★'.repeat(item.stars)}</Text>
            <TouchableOpacity onPress={() => handleEditMode(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8ad24e',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  editButton: {
    color: 'blue',
    marginTop: 5,
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
});
