import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import RatingBar from './RatingBar'; 
import api from '../../api/api';

export default function PopUpAvaliacao() {
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [comentarios, setComentarios] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post('/addCommentHeroes', {
                comment: comentarios,
                userId: 1, // substituir pelo ID do usuário atual
                stars: defaultRating
            });
            alert('Comentário enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário');
        } finally {
            setModalAvaliacao(false);
            setComentarios('');
        }
    };

    return (
        <View style={styles.mainContainer}>

            <TouchableOpacity onPress={() => setModalAvaliacao(true)} style={styles.avaliacao}>
                <Text style={{color:'#fff', fontSize: 20}}>⭐ Avalie a Heroes</Text>
            </TouchableOpacity>
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
                            value={comentarios}
                            onChangeText={setComentarios}
                            multiline={true}
                        />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonStyle}
                            onPress={handleSubmit}
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
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    avaliacao:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 30,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
    backgroundColor: '#236B8E',
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
