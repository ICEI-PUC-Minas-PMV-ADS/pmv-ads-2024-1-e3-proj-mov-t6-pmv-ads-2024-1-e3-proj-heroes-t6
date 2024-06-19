import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import { Alert } from 'react-native'


const AuthContext = createContext()


export function AuthProvider({ children }) {
  const [id, setId] = useState(null)
  const [user, setUser] = useState(null)
  
  const validation = async (token) => {
    if (token) {
      try{
        const {data} = await api.get('/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const userID = data.userId.toString()
        setId(userID)
        setUser(true)
      } catch (e){
        setUser(false)
        console.log(e)
      }
    } else {setUser(false)}
  }
  
  const signIn = async ({ email, senha }) => {
    
    const {data} = await api.post('/login', {
      email: email,
      password: senha
    }).catch(error => {console.error(error)});
    
    if (!data.token){
      Alert.alert('Email ou senha incorreto')
    }
    
    validation(data.token)
    
  };
  
  const signOut = () => {
    setUser(false);
    setId(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, id }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}