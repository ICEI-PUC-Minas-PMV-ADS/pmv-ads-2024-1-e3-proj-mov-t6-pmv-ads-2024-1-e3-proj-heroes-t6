import {View, StyleSheet, TouchableOpacity, ImageBackground, Text, ScrollView} from 'react-native'
import { useAuth } from '../services/AuthProvider'
import LinearGradient from 'react-native-linear-gradient';
import Title from '../component/Title'

export default function Home(){
    const { user } = useAuth();
    return(
        <View>
            <LinearGradient colors={['#236B8E','#FFFFFF']} style={style.gradient}>
                <ScrollView>
                    <View style={style.background}>
                        <TouchableOpacity style={style.cards}>
                            <Text>testando o nosso card</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>                
    )
}

const style = StyleSheet.create({
    gradient: {
        height: 800,
    },
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
      ImgCard:{
        flex: 1,
        resizeMode:"cover"
      }
})