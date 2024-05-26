import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, Alert, ScrollView } from 'react-native';
import CommentCards from './CommentCards';
import api from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../services/AuthProvider';

export default function ModalAboltInstituition() {
    const [modalVisible, setModalVisible] = useState(false);
    const [institutionName, setInstitutionName] = useState('');
    const [institutionDesc, setInstitutionDesc] = useState('');
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('1');  // ID do usuário atual
    const { id } = useAuth();
    const [detailsModalVisible, setDetailsModalVisible] = useState(false); // Novo estado para controlar a visibilidade do modal de detalhes

    useEffect(() => {
        loadInstitutions();
    }, []);

    const onEditPress = (item) => {
        setInstitutionName(item.name);
        setInstitutionDesc(item.description);
        setSelectedInstitution(item);
        setIsEditing(true);
        setModalVisible(true);
        setDetailsModalVisible(false); // Garante que o modal de detalhes não estará visível
    };

    const onViewPress = (item) => {
        setSelectedInstitution(item);
        setDetailsModalVisible(true); // Ativa apenas o modal de detalhes
        setModalVisible(false); // Garante que o modal de edição não estará visível
    };

    const loadInstitutions = () => {
        api.get('/getAllInstituicoes')
            .then(response => setInstitutions(response.data))
            .catch(error => console.error('Erro ao carregar instituições:', error));
    };

    const addOrUpdateInstitution = () => {
        if (institutionName && institutionDesc) {
            const endpoint = isEditing ? '/updateInstituicao' : '/addInstituicao';
            api.post(endpoint, { id: selectedInstitution?.id, name: institutionName, description: institutionDesc })
                .then(() => {
                    setInstitutionName('');
                    setInstitutionDesc('');
                    setIsEditing(false);
                    setModalVisible(false);
                    setSelectedInstitution(null);
                    loadInstitutions();
                })
                .catch(error => console.error(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} instituição:`, error));
        } else {
            alert('Preencha todos os campos');
        }
    };

    const deleteInstitution = (id) => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir esta instituição?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar', onPress: () => {
                        api.post('/deleteInstituicao', { id })
                            .then(() => loadInstitutions())
                            .catch(error => console.error('Erro ao excluir instituição:', error));
                    }
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {id === userId && (
                <Button title="Adicionar Instituição" onPress={() => {
                    setSelectedInstitution(null);
                    setIsEditing(false);
                    setModalVisible(true);
                }} />
            )}
            <FlatList
                data={institutions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.institutionCard}>
                        <TouchableOpacity onPress={() => onViewPress(item)}>
                            <Text style={styles.institutionTitle}>{item.name}</Text>
                        </TouchableOpacity>
                        {id === userId && (
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => onEditPress(item)}>
                                    <Image source={require('../../../assets/Image/edit.png')} style={styles.buttonImage} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteInstitution(item.id)}>
                                    <Image source={require('../../../assets/Image/delete.png')} style={styles.buttonImage} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
            {detailsModalVisible && selectedInstitution && (
                <Modal visible={detailsModalVisible} animationType="slide">
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => {
                            setSelectedInstitution(null);
                            setDetailsModalVisible(false);
                        }}>
                            <Text style={styles.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                        <Text style={styles.institutionTitle}>{selectedInstitution.name}</Text>
                        <Text>{selectedInstitution.description}</Text>
                        <CommentCards institutionId={selectedInstitution.id} />
                    </View>
                </Modal>
            )}
            {modalVisible && id === userId && (
                <Modal visible={modalVisible} animationType="slide">
                    <View style={styles.modal}>
                        <TextInput
                            placeholder="Nome da Instituição"
                            value={institutionName}
                            onChangeText={setInstitutionName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Descrição"
                            value={institutionDesc}
                            onChangeText={setInstitutionDesc}
                            style={styles.input}
                        />
                        <Button title={isEditing ? "Atualizar" : "Salvar"} onPress={addOrUpdateInstitution} />
                        <Button title="Cancelar" onPress={() => {
                            setModalVisible(false);
                            setIsEditing(false);
                            setInstitutionName('');
                            setInstitutionDesc('');
                        }} />
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    institutionCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    institutionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modal: {
        padding: 20,
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    closeButton: {
        color: 'red',
        textAlign: 'right',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonImage: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
    },
});
