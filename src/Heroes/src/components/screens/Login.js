import { useState } from 'react'
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native'

export default function Login(){
    const [email, setEmail]=useState('')
    const [senha, setSenha]=useState('')

    return(
       <View>
            <TextInput 
                style={estilos.input}
                value={email}
                onChangeText={text=>setEmail(text)}>
            </TextInput>

            <TextInput 
                style={estilos.input}
                value={senha}
                onChangeText={text=>setEmail(text)}>
            </TextInput>

            <TouchableOpacity>
                <Text>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Entrar</Text>
            </TouchableOpacity>
       </View>
    )
}
const estilos = StyleSheet.create({
   input:{
    borderWidth:1,
    borderColor:'black'
   }
})