import { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import Login from './Login'
import Sign_up from './Sign_up'
import { useAuth } from '../services/AuthProvider'


export default function Teste () {
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const {user} = useAuth()

  return (
    <>
      {user?(
        <></>
      ):(
        <View style={styles.container}>
          <View style={styles.bgTop}>
            <View style={styles.style1}>
              <View style={styles.style2}>
                <Image source={require('../../../assets/Image/heroLogobyDesigner.png')} style={styles.imgLogo}/>
              </View>
            </View>
            <View style={styles.bgbutton}>
              <TouchableOpacity
                onPress={() => setIsLoginSelected(true)}
                style={[styles.buttons, isLoginSelected && styles.buttonsActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.text, isLoginSelected && styles.textActive]} activeOpacity={0.8}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsLoginSelected(false)}
                style={[styles.buttons, !isLoginSelected && styles.buttonsActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.text, !isLoginSelected && styles.textActive]} activeOpacity={0.8}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.container2}> 
          {isLoginSelected ? <Login /> : <Sign_up />}
        </View>
      
</View>

      )}
    </>
      
  )
}


const styles = StyleSheet.create({

  container2:{
    marginTop: 80,
  },

  imgLogo: {
    width: 250,
    height: 250,
    position: 'absolute',
    marginTop: 40,
  },

  style1: {
    display: 'flex',
    alignItems: 'center',
    width: 820 * 0.5,
    height: 400 * 0.5,
    marginTop: -10,
    backgroundColor: 'white',
    position: 'absolute',
    borderBottomLeftRadius: (820 * 0.5) / 2,
    borderBottomRightRadius: (820 * 0.5) / 2,
  },

  style2: {
    display: 'flex',
    alignItems: 'center',
    width: 800 * 0.5,
    height: 400 * 0.5,
    marginTop: -50,
    backgroundColor: '#F26430',
    position: 'absolute',
    borderBottomLeftRadius: (800 * 0.5) / 2,
    borderBottomRightRadius: (800 * 0.5) / 2,
  },

  bgTop: {
    backgroundColor: '#236B8E',
    width: '100%',
    minHeight: 250,
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  buttons:{
    backgroundColor:'#E6E6E6',
    justifyContent:'center',
    alignItems:'center',
    width:180,
    borderRadius:2025,
    height:55,
    alignSelf:'center',
  },
  buttonsActive: {
    backgroundColor: '#F26430',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  textActive: {
    color: 'white',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top'
  },

  bgbutton: {
    display: 'flex',
    position: 'absolute',
    marginTop: 220,
    flexDirection: 'row',
    width: 360,
    backgroundColor: '#E6E6E6',
    borderRadius:2025,
  }
})