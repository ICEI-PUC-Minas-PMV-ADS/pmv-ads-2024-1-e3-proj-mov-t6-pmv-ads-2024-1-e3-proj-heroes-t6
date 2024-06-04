import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert, Image, ImageBackground, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import Title from '../component/Title';
import { useAuth } from '../services/AuthProvider';
import api from '../../api/api';

// -------------- Home ------------//
const Home = ({ navigation }) => {
    const { id } = useAuth();
    const [camps, setCamps] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchCamps();
        }, [])
    );

    const fetchCamps = async () => {
        try {
            const { data } = await api.get('/getAllCamp');
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
                                <TouchableOpacity key={camp.id} style={styles.cards} onPress={() => navigation.navigate('Doacoes', { camp })}>
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

// -------------- Modal: Edit e Create ------------//
const CampanhaModal = ({ navigation, route }) => {
    const { id } = useAuth();
    const { camp } = route.params || {};
    const [titulo, setTitulo] = useState(camp ? camp.title : '');
    const [subtitulo, setSubtitulo] = useState(camp ? camp.subtitle : '');
    const [descricao, setDescricao] = useState(camp ? camp.description : '');
    const [valor, setValor] = useState(camp ? camp.value.toString() : '');
    const [empresa, setEmpresa] = useState(camp ? camp.company : '');
    const [pix, setPix] = useState(camp ? camp.pix : '');

    const addOrUpdateCamp = async () => {
        if (!titulo || !subtitulo || !descricao || !valor || !empresa || !pix) {
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
                    pix : pix,
                    userId: id,
                });
                Alert.alert('Campanha atualizada com sucesso.');
            } else {
                await api.post('/createCamp', {
                    title: titulo,
                    subtitle: subtitulo,
                    description: descricao,
                    value: valor,
                    company: empresa,
                    pix : pix,
                    userId: id,
                });
                Alert.alert('Campanha criada com sucesso.');
            }
            setTitulo('');
            setSubtitulo('');
            setDescricao('');
            setValor('');
            setEmpresa('');
            setPix('');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao salvar campanha.', error.message);
        }
    };

    const handleValueChange = (text) => {
        // Filtra para permitir apenas números e um ponto decimal
        let filteredText = text.replace(/[^0-9.]/g, '');

        // Se houver mais de um ponto decimal, remova os pontos extras
        const firstDecimalIndex = filteredText.indexOf('.');
        if (firstDecimalIndex !== -1) {
            filteredText = filteredText.slice(0, firstDecimalIndex + 1) + filteredText.slice(firstDecimalIndex + 1).replace(/\./g, '');
        }

        // Limita a precisão decimal a duas casas
        if (filteredText.includes('.')) {
            const [integerPart, decimalPart] = filteredText.split('.');
            if (decimalPart.length > 2) {
                filteredText = `${integerPart}.${decimalPart.slice(0, 2)}`;
            }
        }

        setValor(filteredText);
    };

    return (
        <>
            <Title title={camp ? 'Editar Campanha' : 'Nova Campanha'} />
            <View>
                <ScrollView>
                    <View style={styles.container}>
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

                        <Text style={styles.label}>Valor</Text>
                        <TextInput
                            placeholder="Valor(R$)"
                            style={styles.inputs}
                            keyboardType="numeric"
                            value={valor}
                            onChangeText={handleValueChange}
                        />

                        <Text style={styles.label}>Empresa</Text>
                        <TextInput
                            placeholder="Empresa"
                            style={styles.inputs}
                            value={empresa}
                            onChangeText={(text) => setEmpresa(text)}
                        />

                        <Text style={styles.label}>Chave Pix</Text>
                        <TextInput
                            placeholder="Chave Pix"
                            style={styles.inputs}
                            value={pix}
                            onChangeText={(text) => setPix(text)}
                        />

                        <TouchableOpacity
                            style={[styles.btnCadastrar1, { backgroundColor: '#F26430' }]}
                            onPress={addOrUpdateCamp}>
                            <Text style={styles.TxtbtnCadastrar}>{camp ? 'Atualizar' : 'Salvar'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnCadastrar2}
                            onPress={() => navigation.goBack()}>
                            <Text style={styles.TxtbtnCadastrar}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

// --------------Doações ------------//
const Doacoes = ({ navigation, route }) => {
    const { id } = useAuth();
    const [name, setName] = useState('');
    const [doacao, setDoacao] = useState('');
    const { camp } = route.params || {};
    const [pixKey] = useState(camp.pix);
    const [totalDoacoes, setTotalDoacoes] = useState(0);

    const progresso = Math.min((totalDoacoes / camp.value).toFixed(2), 1);
    console.log(progresso);

    useEffect(() => {
        fetchAllDonations();
        fetchName();
    }, []);

    const fetchName = async () => {
        try {
          const {data} = await api.post('/user', {userid: id});
          setName(data.name)
        } catch (error) {
          console.error('Erro ao buscar o nome do usuário:', error);
        }
    };

    const fetchAllDonations = async () => {
        try {
            const response = await api.get('/getAllDonations', { params: { campId: camp.id } });
            console.log(response.data.totalDonations);
            setTotalDoacoes(response.data.totalDonations);
        } catch (error) {
            console.error('Erro ao buscar as doações da campanha:', error);
        }
    };
    
    const addDonate = async () => {
        if (!doacao) {
            Alert.alert('Informe o valor à ser doado.');
            return;
        }
        try {
             await api.post('/createDonations', {
                    campid: camp.id,
                    userid: id,
                    name: name,
                    donate: doacao,
                });
                Alert.alert('Doação feita com sucesso!');
                fetchAllDonations();
                setDoacao('');
            }
        catch (error) {
            Alert.alert('Erro ao salvar doação.', error.message);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(pixKey);
    };

    const handleDoacaoChange = (text) => {
        // Filtra para permitir apenas números e um ponto decimal
        let filteredText = text.replace(/[^0-9.]/g, '');

        // Se houver mais de um ponto decimal, remova os pontos extras
        const firstDecimalIndex = filteredText.indexOf('.');
        if (firstDecimalIndex !== -1) {
            filteredText = filteredText.slice(0, firstDecimalIndex + 1) + filteredText.slice(firstDecimalIndex + 1).replace(/\./g, '');
        }

        // Limita a precisão decimal a duas casas
        if (filteredText.includes('.')) {
            const [integerPart, decimalPart] = filteredText.split('.');
            if (decimalPart.length > 2) {
                filteredText = `${integerPart}.${decimalPart.slice(0, 2)}`;
            }
        }

        setDoacao(filteredText);
    };

    return (
        <>
            <Title title={camp.title} />
            <View style={styles.background1}>
                <ScrollView style={styles.background2}>
                    <View style={styles.container}>
                        <Text style={styles.label2}>Descrição</Text>
                        <Text style={styles.txtDonation}>{camp.description}</Text>
                        <Text style={styles.label2}>Empresa Responsável</Text>
                        <Text style={styles.txtDonation}>{camp.company}</Text>
                        <Text style={styles.label2}>Meta</Text>
                        <Text style={styles.txtDonation}>R${camp.value.toFixed(2)}</Text>

                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${progresso * 100}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{`${(progresso * 100).toFixed(2)}%`}</Text>

                        <Text style={styles.label2}>Doação</Text>
                        <TextInput
                            placeholder="Valor(R$)"
                            style={styles.inputs}
                            keyboardType="numeric"
                            value={doacao}
                            onChangeText={handleDoacaoChange}
                        />

                        <Text style={styles.label2}>Chave Pix</Text>
                        <View style={styles.pixContainer}>
                            <TextInput
                                style={styles.pixKeyInput}
                                value={pixKey}
                                editable={false}
                            />
                            <TouchableOpacity style={styles.pixButton} onPress={copyToClipboard}>
                            <Image source={require('../../../assets/Image/copy_icon.png')} style={styles.iconImage} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={[styles.btnCadastrar1, progresso >= 1 ? styles.btnCadastrar1Disabled : styles.btnCadastrar1Enabled]}
                            onPress={addDonate}
                            disabled={progresso >= 1}>
                            <Text style={styles.TxtbtnCadastrar}>Doar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnCadastrar2}
                            onPress={() => navigation.goBack()}>
                            <Text style={styles.TxtbtnCadastrar}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

// -------------- Navegação ------------//
const Pilha = createNativeStackNavigator();

export default function NavegarTelasCamp(){
  
    return(
        <>
        <Pilha.Navigator initialRouteName="Campaigns">
                <Pilha.Screen
                    name='Campaigns'
                    component={Home}
                    options={{headerShown: false}}>
                </Pilha.Screen>

                <Pilha.Screen
                    name='CampanhaModal'
                    component={CampanhaModal}
                    options={{headerShown: false}}>
                </Pilha.Screen>

                <Pilha.Screen
                    name='Doacoes'
                    component={Doacoes}
                    options={{headerShown: false}}>
                </Pilha.Screen>
        </Pilha.Navigator>
      </> 
    )
};

// -------------- Estilos ------------//
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
        height: '100%',
    },
    background1: {
        backgroundColor: '#236B8E',
        flex: 1,
    },
    background2: {
        backgroundColor: '#F0F0F0',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    button: {
        position: 'absolute',
        bottom: '33%',
        right: '3%',
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
        color: 'white',
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
        paddingTop: '5%',
    },
    label: {
        fontSize: 18,
        width: 330,
        height: 20,
        alignSelf: 'center',
    },
    label2: {
        fontSize: 18,
        fontWeight: 'bold',
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
        color: 'white',
    },
    btnCadastrarContainer: {
        position: 'absolute',
        top: '90%',
        alignSelf: 'center',
    },
    btnCadastrar1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        marginTop: 30,
        borderRadius: 20,
        height: 50,
        alignSelf: 'center',
        fontSize: 60,
    },
    btnCadastrar1Enabled: {
        backgroundColor: '#F26430',
    },
    btnCadastrar1Disabled: {
        backgroundColor: '#999999',
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
    txtDonation: {
        fontSize: 20,
        textAlign: 'justify',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 45,
        marginRight: 45,
    },
    progressBarContainer: {
        height: 20,
        width: '80%',
        backgroundColor: '#e0e0df',
        borderRadius: 5,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#3b5998',
    },
    progressText: {
        alignSelf: 'center',
        fontSize: 16,
    },
    pixContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: 330,
        alignSelf: 'center',
    },
    pixKeyInput: {
        borderBottomWidth: 1,
        fontSize: 20,
        flex: 1,
        marginRight: 10,
    },
    pixButton: {
        backgroundColor: '#999999',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 3,
    },
    pixButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
