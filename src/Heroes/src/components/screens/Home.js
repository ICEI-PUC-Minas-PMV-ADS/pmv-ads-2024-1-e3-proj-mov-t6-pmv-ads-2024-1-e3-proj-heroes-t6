import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native'
export default function Home(props){
    return(
        <View>
                <View style={estilos.background}>
                    <TouchableOpacity style={estilos.cards}>
                        <Text style={estilos.texto}>{props.tituloCard}</Text>
                    </TouchableOpacity>
                </View>
        </View>
        
    )
}

const estilos = StyleSheet.create({
    cards:{
        borderRadius:20,
        marginTop:20,
        marginLeft: 20,
        marginRight:20,
        height:110,
        backgroundColor:'#ffff',
        overflow: 'hidden',
        elevation: 10
    },
    background:{
        height:140,
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
})