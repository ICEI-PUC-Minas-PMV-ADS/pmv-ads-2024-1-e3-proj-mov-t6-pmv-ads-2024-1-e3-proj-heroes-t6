import { useState } from 'react'
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native'

export default function Cadastro (){

    const [nomeCompleto, setNomeCompleto] = useState('')
    const [email, setEmail]=useState('')
    const [senha, setSenha]=useState('')
    const [confirmaSenha, setConfirmaSenha] = useState('')
 

    return(
       <View>
            <TextInput 
                style={estilos.input}
                value={nomeCompleto}
                onChangeText={text=>setNomeCompleto(text)}>
            </TextInput>

            <TextInput 
                style={estilos.input}
                value={email}
                onChangeText={text=>setEmail(text)}>
            </TextInput>

            <TextInput 
                style={estilos.input}
                value={senha}
                onChangeText={text=>setSenha(text)}>
            </TextInput>

            <TextInput 
                style={estilos.input}
                value={confirmaSenha}
                onChangeText={text=>setConfirmaSenha(text)}>
            </TextInput>

            <TouchableOpacity>
                <Text>Cadastrar</Text>
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