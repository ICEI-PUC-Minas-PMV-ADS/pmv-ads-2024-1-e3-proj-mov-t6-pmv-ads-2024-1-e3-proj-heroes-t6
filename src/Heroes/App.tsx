import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Login_SignUp from './src/components/screens/Login_SignUp'
import { AuthProvider } from './src/components/services/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Home from './src/components/screens/Home';
import NavBar from './src/components/screens/NavBar'
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    
    <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider >
            <Login_SignUp />
            <NavBar />
          </AuthProvider>
        </NavigationContainer>
    </SafeAreaProvider>
      
  );
}

export default App;
