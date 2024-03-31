import { useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';


// Incompleto *****

export default function NavLogin(){
    const Pilha = createNativeStackNavigator()
    return(
        <Pilha.Navigator initialRouteName="Login">
            <Pilha.Screen
                component={TelaLogin}
                name='Login'>
            </Pilha.Screen>
        </Pilha.Navigator>
    )
}
const estilos = StyleSheet.create({
   input:{
    borderWidth:1,
    borderColor:'black'
   }
})