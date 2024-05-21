import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert, Image, ImageBackground, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Title from '../component/Title';
import { useAuth } from '../services/AuthProvider';
import api from '../../api/api';

const Home = ({ navigation }) => {
    const { id } = useAuth();
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        fetchCamps();
    }, []);

    const fetchCamps = async () => {
        try {
            const { data } = await api.get('/getAllCamp');
            console.log('Dados recebidos:', data);
            setCamps(data);
        } catch (error) {
            Alert.alert('Erro ao buscar campanhas.', error.message);
        }
    };

    const editCamp = (camp) => {
        navigation.navigate('CampanhaModal', { camp, fetchCamps });
    };

    const delCamp = async (id) => {
        try {
            await api.post('/deleteCamp', { campid: id });
            fetchCamps();
        } catch (error) {
            console.error('Erro ao deletar a campanha:', error);
        }
    };

    return (
        <>
            <Title title='Campanhas' />
            <View>
                <LinearGradient colors={['#236B8E', '#FFFFFF']} style={styles.gradient}>
                    <ScrollView style={styles.background}>
                        {camps.length === 0 ? (
                            <Text style={styles.emptyText}>Nenhuma campanha disponível.</Text>
                        ) : (
                            camps.map(camp => (
                                <TouchableOpacity key={camp.id} style={styles.cards}>
                                    <ImageBackground
                                        source={require('../../../assets/Image/fundo1.png')}
                                        imageStyle={styles.cardImage}
                                    >
                                        {camp.userId.toString() === id && (
                                            <View style={styles.buttonIconContainer}>
                                                <TouchableOpacity style={styles.iconButton} onPress={() => editCamp(camp)}>
                                                    <Image source={require('../../../assets/Image/edit.png')} style={styles.iconImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.iconButton} onPress={() => {
                                                    Alert.alert(
                                                        "Remover Campanha", 
                                                        "Tem certeza que deseja apagar a campanha?", 
                                                        [
                                                            {
                                                                text: "Cancelar",
                                                                onPress: () => {},
                                                                style: "cancel"
                                                            },
                                                            { 
                                                                text: "Confirmar", 
                                                                onPress: () => delCamp(camp.id)
                                                            }
                                                        ]
                                                    )
                                                }}>
                                                    <Image source={require('../../../assets/Image/delete.png')} style={styles.iconImage} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <Text style={styles.cardTitle}>{camp.title}</Text>
                                        <Text style={styles.cardSubtitle}>{camp.subtitle}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))
                        )}
                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CampanhaModal', { fetchCamps })}>
                        <Text style={styles.buttonText}>+ Nova Campanha</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </>
    );
};

const CampanhaModal = ({ navigation, route }) => {
    const { id } = useAuth();
    const { camp, fetchCamps } = route.params || {};
    const [titulo, setTitulo] = useState(camp ? camp.title : '');
    const [subtitulo, setSubtitulo] = useState(camp ? camp.subtitle : '');
    const [descricao, setDescricao] = useState(camp ? camp.description : '');
    const [valor, setValor] = useState(camp ? camp.value.toString() : '');
    const [empresa, setEmpresa] = useState(camp ? camp.company : '');

    const addOrUpdateCamp = async () => {
        if (!titulo || !subtitulo || !descricao || !valor || !empresa) {
            Alert.alert('Preencha todos os campos.');
            return;
        }

        try {
            if (camp) {
                await api.post('/updateCamp', {
                    campid: camp.id,
                    title: titulo,
                    subtitle: subtitulo,
                    description: descricao,
                    value: valor,
                    company: empresa,
                    userId : id,
                });
                Alert.alert('Campanha atualizada com sucesso.');
            } else {
                await api.post('/createCamp', {
                    title: titulo,
                    subtitle: subtitulo,
                    description: descricao,
                    value: valor,
                    company: empresa,
                    userId: id,
                });
                Alert.alert('Campanha criada com sucesso.');
            }

            if (fetchCamps) {
                await fetchCamps();
            }

            setTitulo('');
            setSubtitulo('');
            setDescricao('');
            setValor('');
            setEmpresa('');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao salvar campanha.', error.message);
        }
    };

    return (
        <>
            <Title title={camp ? 'Editar Campanha' : 'Nova Campanha'} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        placeholder="Título"
                        style={styles.inputs}
                        value={titulo}
                        onChangeText={(text) => setTitulo(text)}
                    />

                    <Text style={styles.label}>Subtítulo</Text>
                    <TextInput
                        placeholder="Subtítulo"
                        style={styles.inputs}
                        value={subtitulo}
                        onChangeText={(text) => setSubtitulo(text)}
                    />

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        placeholder="Descrição"
                        style={styles.inputs}
                        value={descricao}
                        onChangeText={(text) => setDescricao(text)}
                    />

                    <Text style={styles.label}>Valor - R$</Text>
                    <TextInput
                        placeholder="Valor"
                        style={styles.inputs}
                        keyboardType="numeric"
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                    />

                    <Text style={styles.label}>Empresa</Text>
                    <TextInput
                        placeholder="Empresa"
                        style={styles.inputs}
                        value={empresa}
                        onChangeText={(text) => setEmpresa(text)}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btnCadastrar1}
                        onPress={addOrUpdateCamp}
                    >
                        <Text style={styles.TxtbtnCadastrar}>{camp ? 'Atualizar' : 'Salvar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCadastrar2}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.TxtbtnCadastrar}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
// -------------- Navegação ------------//
const Pilha = createNativeStackNavigator()

export default function NavegarTelasCamp(){
  
    return(
        <>
        <Pilha.Navigator initialRouteName="Home">
                <Pilha.Screen
                    name='Home'
                    component={Home}
                    options={{headerShown: false}}>
                </Pilha.Screen>

                    <Pilha.Screen
                        name='CampanhaModal'
                        component={CampanhaModal}
                        options={{headerShown: false}}>
                    </Pilha.Screen>
        </Pilha.Navigator>
      </> 
    )
}

const styles = StyleSheet.create({
    gradient: {
        height: 680,
    },
    cards: {
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#ffff',
        overflow: 'hidden',
        elevation: 10,
        height: 120,
    },
    cardImage: {
        alignSelf: 'center',
        position: 'absolute',
        height: 120,
        width: '100%',
    },
    background: {
        height: 680,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        backgroundColor: '#F26430',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'white'
    },
    cardTitle: {
        marginTop: 30,
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        marginTop: 10,
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
    },
    buttonIconContainer: {
        marginTop: 10,
        flexDirection: 'row',
        position: 'absolute',
        marginLeft: '5%',
        alignSelf: 'flex-end',
    },
    iconButton: {
        padding: 5,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    emptyText: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'white',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        marginTop: '-15%',
    },
    label: {
        fontSize: 18,
        width: 330,
        height: 20,
        alignSelf: 'center',
    },
    inputs: {
        borderBottomWidth: 1,
        fontSize: 20,
        width: 330,
        height: 60,
        marginBottom: 20,
        alignSelf: 'center',
    },
    TxtbtnCadastrar: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'white'
    },
    btnCadastrar1: {
        backgroundColor: '#F26430',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        marginTop: 30,
        borderRadius: 20,
        height: 50,
        alignSelf: 'center',
        fontSize: 60,
    },
    btnCadastrar2: {
        backgroundColor: '#236B8E',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        marginTop: 20,
        borderRadius: 20,
        height: 50,
        alignSelf: 'center',
        fontSize: 60,
    },
});
