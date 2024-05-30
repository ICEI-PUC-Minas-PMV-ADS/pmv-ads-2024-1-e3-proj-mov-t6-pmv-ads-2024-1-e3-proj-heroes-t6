import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import api from '../../api/api';
import { useAuth } from '../services/AuthProvider';

export default function CommentCards({ institutionId }) {
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
                        setComentario('');
                        loadComments();
                    })
                    .catch(error => console.error('Erro ao adicionar comentário:', error));
            } else {
                console.error('Nome do usuário não foi carregado.');
            }
        } else {
            Alert.alert('Atenção', 'É necessário preencher o campo "Escrever comentário".');
        }
    };

    const loadComments = () => {
        api.get('/getCommentsByInstitution', { params: { institutionId } })
            .then(response => {
                console.log('Comentários carregados:', response.data);
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
        const updatedComments = comentarios.map(comment => {
            if (comment.id === id) {
                return { ...comment, editable: !comment.editable };
            }
            return comment;
        });
        setComentarios(updatedComments);
    };

    const saveComment = (id, newText) => {
        api.post('/updateComment', { id, comment: newText })
            .then(() => loadComments())
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
        <View style={styles.container}>
            <TextInput
                value={comentario}
                style={styles.textInput}
                placeholder="Escrever comentário:"
                onChangeText={(text) => setComentario(text)}
                multiline={true}
            />
            <TouchableOpacity onPress={addComment}>
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
                                <Text style={styles.commentText}>
                                    <Text style={styles.userName}>{item.userName}</Text>
                                    {'\n'}
                                    {item.text}
                                </Text>
                            )}
                        </View>
                        {item.userId == id ? (
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => deleteComment(item.id)}>
                                    <Image source={require('../../../assets/Image/delete.png')} style={styles.buttonImage} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleEdit(item.id)}>
                                    <Image source={require('../../../assets/Image/edit.png')} style={styles.buttonImage} />
                                </TouchableOpacity>
                                {item.editable && (
                                    <TouchableOpacity onPress={() => saveComment(item.id, item.text)}>
                                        <Text style={{ fontWeight: 'bold', color: 'orange' }}>Salvar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : null}
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
        borderRadius: 15
    },
    commentContainer: {
        borderColor: '#ccc',
        padding: 10,
        borderTopWidth: 1
    },
    commentTextContainer: {
        marginBottom: 10,
    },
    commentText: {
        fontSize: 16,
    },
    userName: {
        fontWeight: 'bold',
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
    btnEnviar: {
        backgroundColor: '#F26430',
        color: "#fff",
        width: 130,
        fontSize: 21,
        alignSelf: "center",
        textAlign: "center",
        padding: 6,
        borderRadius: 8,
        marginBottom: 20
    },
});
