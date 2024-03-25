import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native'
export default function Home(props){
    return(
        <View>
                <View>
                    <TouchableOpacity style={estilos.cards}>
                        <Text style={estilos.texto}>{props.tituloCard}</Text>
                        <ImageBackground source={require('../../../assets/Image/Thumb_Alagamentos1.jpg')} style={estilos.imageCard}></ImageBackground>
                    </TouchableOpacity>
                </View>
        </View>
        
    )
}

const estilos = StyleSheet.create({
    cards:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:20,
        margin:20,
        height:150,
        backgroundColor:'#eee',
        overflow: 'hidden'
    },
    texto:{
        alignSelf:'center',
        color:'#000',
        fontWeight:'bold',
        fontSize:20,
        marginTop:10
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      imageCard:{
        flex:1,
        resizeMode: 'cover',
        opacity:0.7
      }
})