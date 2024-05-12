import {View, StyleSheet, Image } from 'react-native'
import Title from '../component/Title'
import CardInstitution from '../component/CardsInstitution'
export default function About(){
    return(
        <>
            <Title title='Sobre'/>
            <View style={estilos.background}>
                <View style={estilos.background1}>
                        <Image source={require('../../../assets/Image/heroLogobyDesigner.png')} style={estilos.imgLogo}/> 
                        <CardInstitution/>
                </View>
            </View>
        </>
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