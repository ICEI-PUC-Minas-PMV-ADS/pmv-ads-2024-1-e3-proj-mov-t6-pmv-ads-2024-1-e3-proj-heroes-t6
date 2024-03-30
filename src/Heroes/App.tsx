import {Image, View, Text, StyleSheet, ScrollView} from 'react-native';
import Home from './src/components/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Info from './src/components/screens/Info';
import Perfil from './src/components/screens/Perfil';
import LinearGradient from 'react-native-linear-gradient';



import infoIcon from './assets/Image/info.png';

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
           <LinearGradient colors={['#236B8E','#FFFFFF']}>
             <View>
                <Text style={estilos.titulo}>Principais acontecimentos</Text>
             </View>
                <View>
                    <Home tituloCard='Alagamentos em SP'/>
                    <Home tituloCard='Secas no Nordeste'/>
                    <Home tituloCard='Familias desabrigadas no RJ'/>
                    <Home tituloCard='Bairro mais pobre de BH'/>
                    <Home tituloCard='Bairro mais pobre de BH'/>
                    <Home tituloCard='Bairro mais pobre de BH'/>
                    <Home tituloCard='Bairro mais pobre de BH'/>
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
           tabBarLabelStyle: {fontSize: 20, marginBottom: 10},
           tabBarStyle: { height: 80, elevation: 5},

            tabBarActiveTintColor: '#F26430'}}

            initialRouteName='Home'>

        <Guias.Screen
          name="Info"
            component={TelaInfo}
              options={{
                  title: 'Sobre',
                    tabBarIcon: ({ color, focused }) => (
                      <Image
                      source={focused ? require('./assets/Image/infoFill.png') : require('./assets/Image/info.png')}
                      style={{ width: 30, height: 30, tintColor: color, marginTop: 10 }}
                      />
                      ),
                    headerStyle: {
                      backgroundColor: '#236B8E',
                      height:110,
                      },
                      headerTintColor: '#ffff',
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
              tabBarIcon: ({ color, focused }) => (
                <Image
                source={focused ? require('./assets/Image/homeFill.png') : require('./assets/Image/home.png')}
                style={{ width: 30, height: 30, tintColor: color, marginTop: 10 }}
                />
                ),
              headerShown: false   }}>
        </Guias.Screen>

        <Guias.Screen
          name='Perfil'
            component={TelaPerfil}
              options={{
                title: 'Perfil',
                  tabBarIcon: ({ color, focused }) => (
                    <Image
                    source={focused ? require('./assets/Image/personFill.png') : require('./assets/Image/person.png')}
                    style={{ width: 30, height: 30, tintColor: color, marginTop: 10 }}
                    />
                    ),
                   headerStyle: {
                     backgroundColor: '#236B8E',
                     height:110,
                    },
                    headerTintColor: '#ffff',
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