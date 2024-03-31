import {View, StyleSheet, Image, Button } from 'react-native'
import NavLogin from './Login'

export default function Perfil(){
    return(
        <View style={estilos.background}>
           <View style={estilos.background1}>
                <Image source={require('../../../assets/Image/heroLogobyDesigner.png')} style={estilos.imgLogo}/> 
           </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    background:{
        backgroundColor:'#236B8E',
        flex:1,
    },
    background1:{
        backgroundColor:'#F0F0F0',
        flex:1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    imgLogo:{
        width:200,
        height:200,
        alignSelf: 'center',    
    },
})