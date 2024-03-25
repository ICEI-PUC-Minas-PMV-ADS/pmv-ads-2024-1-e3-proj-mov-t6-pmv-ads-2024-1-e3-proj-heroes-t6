import {Image, View, Text, StyleSheet, ScrollView} from 'react-native';
import Home from './src/components/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Info from './src/components/screens/Info';
import Perfil from './src/components/screens/Perfil';
import LinearGradient from 'react-native-linear-gradient';

//***************************** Funções *************************************/

const TelaInfo = ({navigation}) => {
  return (
   <Info />
  )
}

const TelaHome = ({navigation}) => {
  return(
    <View>
        <ScrollView>
           <LinearGradient colors={['#337593','#99bacc']}>
             <View>
                <Text style={estilos.titulo}>Principais acontecimentos</Text>
             </View>
                <View>
                    <Home tituloCard='Alagamentos em SP'/>
                    <Home tituloCard='Secas no Nordeste'/>
                    <Home tituloCard='Familias desabrigadas no RJ'/>
                    <Home tituloCard='Bairro mais pobre de BH'/>
                </View>
             </LinearGradient>
          </ScrollView>
    </View>
  )
}

const TelaPerfil = ({navigation}) => {
  return( 
  <Perfil/>
  )
}

//************************** Estrutura de navegação ************************/
const Guias = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Guias.Navigator
        screenOptions={{
           tabBarLabelStyle: {
             fontSize: 15
            },
                tabBarActiveTintColor: '#f4693a'
      }}
                initialRouteName='Home'>

        <Guias.Screen
          name="Info"
            component={TelaInfo}
              options={{
                  title: 'Sobre',
                    headerStyle: {
                      backgroundColor: '000',
                      },
                      headerTintColor: 'red',
                  headerTitleStyle: {
              fontSize: 25,
            fontWeight: 'bold',
          alignSelf: 'center',
            }}}>
        </Guias.Screen>

        <Guias.Screen
          name='Home'
           component={TelaHome}
             options={{
                title: 'Home',
                  headerStyle: {
                    backgroundColor: '000',
                  },
                   headerTintColor: 'red',
                 headerTitleStyle: {
              fontSize: 25,
            fontWeight: 'bold',
          alignSelf: 'center',
            }}}>
        </Guias.Screen>

        <Guias.Screen
          name='Perfil'
            component={TelaPerfil}
              options={{
                title: 'Perfil',
                   headerStyle: {
                     backgroundColor: '000',
                    },
                    headerTintColor: 'red',
                 headerTitleStyle: {
              fontSize: 25,
            fontWeight: 'bold',
          alignSelf: 'center',
            }}}>
        </Guias.Screen>

      </Guias.Navigator>
    </NavigationContainer>
  );
}


const estilos = StyleSheet.create({
  titulo:{
      alignSelf:'center',
      color:'#fff',
      fontSize:30,
      fontWeight:'bold',
      marginTop:10
  }
})