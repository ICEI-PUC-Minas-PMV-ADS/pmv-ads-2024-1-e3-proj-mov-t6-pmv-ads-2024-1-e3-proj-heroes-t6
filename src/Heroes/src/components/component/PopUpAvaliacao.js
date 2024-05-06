import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import RatingBar from './RatingBar'; 

export default function PopUpAvaliacao() {
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const defaultRating = 3; 
    const maxRating = [1, 2, 3, 4, 5]; 

    return (
        <View>
            <Button title="Abrir modal" onPress={() => setModalAvaliacao(true)} />
            <Modal animationType='fade' visible={modalAvaliacao} transparent={true}>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>
                        Classifique a sua experiência
                    </Text>
                    <RatingBar />
                    <Text style={styles.textStyle}>
                        {defaultRating} / {Math.max.apply(null, maxRating)}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonStyle}
                        onPress={() =>{ alert(defaultRating),setModalAvaliacao(false)}}>
                        <Text style={styles.buttonTextStyle}>
                            Obter Valor Selecionado
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:350,
        height:400,
        backgroundColor: 'white',
        padding: 10,
       
        
        textAlign: 'center',
        margin:150,
        justifyContent:'center',
        alignItems:'center',
        alignSelf: 'center'

    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    buttonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
});
