import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, Alert } from 'react-native';
import CommentCards from './CommentCards';
import api from '../../api/api';

export default function ModalAboltInstituition() {
    const [modalVisible, setModalVisible] = useState(false);
    const [institutionName, setInstitutionName] = useState('');
    const [institutionDesc, setInstitutionDesc] = useState('');
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadInstitutions();
    }, []);

    const loadInstitutions = () => {
        api.get('/getAllInstituicoes')
            .then(response => setInstitutions(response.data))
            .catch(error => console.error('Erro ao carregar instituições:', error));
    };

    const addOrUpdateInstitution = () => {
        if (institutionName && institutionDesc) {
            if (isEditing) {
                api.post('/updateInstituicao', { id: selectedInstitution.id, name: institutionName, description: institutionDesc })
                    .then(() => {
                        setInstitutionName('');
                        setInstitutionDesc('');
                        setIsEditing(false);
                        setModalVisible(false)
                        setSelectedInstitution(null);
                        loadInstitutions();
                    })
                    .catch(error => console.error('Erro ao atualizar instituição:', error));
            } else {
                api.post('/addInstituicao', { name: institutionName, description: institutionDesc })
                    .then(() => {
                        setInstitutionName('');
                        setInstitutionDesc('');
                        setModalVisible(false);
                        loadInstitutions();
                    })
                    .catch(error => console.error('Erro ao adicionar instituição:', error));
            }
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

    const renderInstitutionDetails = (institution) => {
        setSelectedInstitution(institution);
    };

    const startEditing = (institution) => {
        setInstitutionName(institution.name);
        setInstitutionDesc(institution.description);
        setSelectedInstitution(institution);
        setIsEditing(true);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Button title="Adicionar Instituição" onPress={() => setModalVisible(true)} />
            <FlatList
                data={institutions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.institutionCard}>
                        <TouchableOpacity onPress={() => renderInstitutionDetails(item)}>
                            <Text style={styles.institutionTitle}>{item.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => startEditing(item)}>
                                <Image source={require('../../../assets/Image/edit.png')} style={styles.buttonImage} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteInstitution(item.id)}>
                                <Image source={require('../../../assets/Image/delete.png')} style={styles.buttonImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            {selectedInstitution && (
                <Modal visible={!!selectedInstitution} animationType="slide">
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => setSelectedInstitution(null)}>
                            <Text style={styles.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                        <Text style={styles.institutionTitle}>{selectedInstitution.name}</Text>
                        <Text>{selectedInstitution.description}</Text>
                        <CommentCards institutionId={selectedInstitution.id} />
                    </View>
                </Modal>
            )}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
 
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
