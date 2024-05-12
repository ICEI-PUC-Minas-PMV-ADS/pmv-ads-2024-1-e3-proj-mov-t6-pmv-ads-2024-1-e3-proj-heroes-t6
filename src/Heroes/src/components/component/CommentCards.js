import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default function CommentCards() {
  const [db, setDB] = useState(null);
  const [Comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      
      try {
        const dbInstance = await SQLite.openDatabase({
          name: 'UserDatabase.db',
          location: 'default',
        });

        console.log('Banco de dados aberto com sucesso');

        dbInstance.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Comments (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)',
            [],
            () => console.log('Tabela de comentários criada com sucesso'),
            (error) => console.error('Erro ao criar a tabela de comentários: ', error),
          );
        });
        setDB(dbInstance);
      } catch (error) {
        console.error('Erro ao abrir o banco de dados: ', error);
      }
    };
    initializeDatabase();
   
  }, []);

  const addComment = () => {
    if(Comentario!=''){
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Comments (text) VALUES (?)',
        [Comentario],
        () => {
          console.log(Comentario, ' ok');
          setComentario('');
          loadComments();
        },
        (error) => console.error('Erro ao adicionar comentário: ', error)
      );
    });
  }

  else{
    Alert.alert('Atenção', 'É necessário preencher o campo "Escrever comentário".')
  }
  };

  const loadComments = () => {
    console.log("Carregando comentários...");
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Comments',
        [],
        (_, resultSet) => {
          const { rows } = resultSet;
          const len = rows.length;
          let comments = [];
          for (let i = 0; i < len; i++) {
            comments.push({ ...rows.item(i), editable: false });
          }
          setComentarios(comments);
          console.log('Comentários recuperados:', comments);
        },
        (error) => console.error('Erro ao carregar comentários: ', error)
      );
    });
  };

  const deleteComment = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este comentário?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Confirmar', onPress: () => {
          db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM Comments WHERE id = ?',
              [id],
              () => {
                console.log('Comentário excluído com sucesso');
                loadComments();
              },
              (error) => console.error('Erro ao excluir comentário: ', error)
            );
          });
        }},
      ]
    );
  };


  const toggleEdit = (id) => {
    const updatedComments = comentarios.map(comment => {
      if (comment.id === id) {
        return { ...comment, editable: !comment.editable };
      }
      return comment;
    });
    setComentarios(updatedComments);
  };


  const saveComment = (id, newText) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Comments SET text = ? WHERE id = ?',
        [newText, id],
        () => {
          console.log('Comentário editado com sucesso');
          loadComments();
        },
        (error) => console.error('Erro ao editar comentário: ', error)
      );
    });
  };

  return (

    <View style={styles.container}>
      <TextInput 
        value={Comentario}
        style={styles.textInput}
        placeholder="Escrever comentário:"
        onChangeText={(text) => setComentario(text)}
        multiline={true}
      />
      <TouchableOpacity
      onPress={addComment}>
        <Text style={styles.btnEnviar}>Enviar</Text>
      </TouchableOpacity>

      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentTextContainer}>
              {item.editable ? (
                <TextInput 
                  style={styles.commentText}
                  value={item.text}
                  onChangeText={(text) => {
                    const updatedComments = comentarios.map(comment => {
                      if (comment.id === item.id) {
                        return { ...comment, text: text };
                      }
                      return comment;
                    });
                    setComentarios(updatedComments);
                  }}
                />
              ) : (
                <Text style={styles.commentText}>{item.text}</Text>
              )}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => deleteComment(item.id)}>
                  <Image source={require('../../../assets/Image/delete.png')} style={styles.buttonImage} />
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleEdit(item.id)}>
                      <Image source={require('../../../assets/Image/edit.png')} style={styles.buttonImage} />
                    </TouchableOpacity>
                      {item.editable && (
                <TouchableOpacity onPress={() => saveComment(item.id, item.text)}>
                  <Text style={{fontWeight:'bold', color:'orange' }}>Salvar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius:15
  },
  commentContainer: {

    borderColor: '#ccc',
    padding: 10,
  
    borderTopWidth:1
  },
  commentTextContainer: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  btnEnviar:{
    backgroundColor:'#F26430',
    color:"#fff",
    width:130,
    fontSize:21,
    alignSelf:"center",
    textAlign:"center",
    padding:6,
    borderRadius:8,
    marginBottom:20
  },

});
