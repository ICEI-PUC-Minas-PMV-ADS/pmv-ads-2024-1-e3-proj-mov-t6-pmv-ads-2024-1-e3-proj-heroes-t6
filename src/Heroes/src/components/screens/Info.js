import {View, StyleSheet, Image } from 'react-native'

export default function Perfil(){
    return(
        <View style={estilos.background}>
           <View>
                <Image source={require('../../../assets/Image/heroLogobyDesigner.png')} style={estilos.imgLogo}/> 
           </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    background:{
        backgroundColor:'#eee',
        flex:1
    },
    imgLogo:{
        width:200,
        height:200,
        alignSelf: 'center',    
    },
})