import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import api from '../../api/api';

export default function CommentCards({ institutionId }) {
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        loadComments();
    }, []);

    const addComment = () => {
        if (comentario !== '') {
            api.post('/addComment', { comment: comentario, userId: institutionId })
                .then(() => {
                    setComentario('');
                    loadComments();
                })
                .catch(error => console.error('Erro ao adicionar comentário:', error));
        } else {
            Alert.alert('Atenção', 'É necessário preencher o campo "Escrever comentário".');
        }
    };

    const loadComments = () => {
        api.get('/getAllComments')
            .then(response => {
                const institutionComments = response.data.filter(comment => comment.userId === institutionId);
                setComentarios(institutionComments);
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
                                    <Text style={{ fontWeight: 'bold', color: 'orange' }}>Salvar</Text>
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
