import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text } from 'react-native';
import Title from '../component/Title';
import CardInstitution from '../component/CardsInstitution';

export default function About() {
    return (
        <>
            <ScrollView>
                <Title title='Sobre'/>
                <View style={styles.background}>
                    <View style={styles.background1}>
                        <Image source={require('../../../assets/Image/heroLogobyDesigner.png')} style={styles.imgLogo}/> 
                        <Text style={styles.descriptionText}>
                            Bem-vindo ao HEROES, onde cada gesto de solidariedade se transforma em uma poderosa onda de esperança. Nosso aplicativo foi criado com o propósito de conectar pessoas que desejam ajudar com comunidades que enfrentaram desastres naturais e outras crises.
                            Através do HEROES, você pode fazer doações diretamente para os locais mais impactados, garantindo que sua contribuição seja utilizada de maneira eficaz e transparente. Nos comprometemos a assegurar que cada centavo doado seja destinado à reconstrução, recuperação e fortalecimento das comunidades afetadas.
                            Ao escolher doar pelo nosso aplicativo, você não apenas oferece recursos financeiros, mas também envia uma mensagem de esperança e solidariedade. Junte-se a nós nesta missão de transformar momentos de adversidade em histórias de superação e resiliência.
                        </Text>
                        <CardInstitution/>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#236B8E',
        flex: 1,
    },
    background1: {
        backgroundColor: '#F0F0F0',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20, // Aumentado para maior espaço interno
    },
    imgLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 20, // Espaço vertical antes e depois da imagem
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
        lineHeight: 21,
        marginHorizontal: 20, // Aumentado para maior margem lateral
        textAlign: 'justify', // Texto justificado para melhorar o fluxo visual
    },
});
