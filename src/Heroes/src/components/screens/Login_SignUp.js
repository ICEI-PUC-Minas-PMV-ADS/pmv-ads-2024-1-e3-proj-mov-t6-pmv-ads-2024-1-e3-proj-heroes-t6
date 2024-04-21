import { useState } from 'react'
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native'
import Login from './Login'
import Sign_up from './Sign_up'
import { useAuth } from '../services/AuthProvider'


export default function Teste () {
  const [use, setUse] = useState(true)
  const {user} = useAuth()
  
  return (
    <>
      {user?(
        <></>
      ):(
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={() => setUse(true)} style={styles.btnEntrar}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
    
          <View>
            <TouchableOpacity onPress={() => setUse(false)} style={styles.btnEntrar}>
              <Text>Cadastrar</Text>
            </TouchableOpacity>
          </View>
    
          {use ? (
            <Login />
          ) : (
            <Sign_up />
          )}      
        </View>
      )}
    </>
      
  )
}


const styles = StyleSheet.create({
    btnEntrar:{
      backgroundColor:'blue',
      justifyContent:'center',
      alignItems:'center',
      width:100,
      borderRadius:20,
      height:50,
      alignSelf:'center'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})