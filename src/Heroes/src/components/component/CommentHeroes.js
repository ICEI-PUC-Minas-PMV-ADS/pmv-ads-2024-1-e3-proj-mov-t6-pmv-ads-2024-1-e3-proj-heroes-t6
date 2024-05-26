import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput } from 'react-native';

export default function CommentHeroes() {
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0);

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Abrir Modal</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escreva seu comentário"
                        onChangeText={setComment}
                        value={comment}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantidade de estrelas"
                        keyboardType="numeric"
                        onChangeText={(text) => setStars(Number(text))}
                        value={stars.toString()}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            // lógica para salvar o comentário
                            setModalVisible(false);
                        }}
                    >
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
});
