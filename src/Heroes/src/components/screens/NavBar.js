import Home from './Home'
import Profile from './Profile';
import About from './About'
import { useState } from 'react'
import { useAuth } from '../services/AuthProvider'

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

export default function NavBar() {
    const {user} = useAuth()
    return (
        <>
            {user ? (
                <Tab.Navigator screenOptions={{
                    tabBarLabelStyle: {fontSize: 15, marginBottom: 10},
                    tabBarStyle: { height: 70, elevation: 5},
    
                    tabBarActiveTintColor: '#F26430'}}
    
                    initialRouteName="Home">
                    
                    <Tab.Screen
                    name='Sobre'
                    component={About}
                    options={{  
                        tabBarIcon: ({ color, focused }) => (
                            <Icon
                            name={focused ? 'information' : 'information-outline'}
                            size={25}
                            color={color}
                        />
                        ),
                        headerShown: false   }}
                    />
                    
                    <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{  
                        tabBarIcon: ({ color, focused }) => (
                            <Icon
                            name={focused ? 'home' : 'home-outline'}
                            size={25}
                            color={color}
                        />
                        ),
                        headerShown: false   }}
                    />

                    <Tab.Screen
                    name='Perfil'
                    component={Profile}
                    options={{  
                        tabBarIcon: ({ color, focused }) => (
                            <Icon
                            name={focused ? 'account' : 'account-outline'}
                            size={25}
                            color={color}
                        />
                        ),
                        headerShown: false   }}
                    />
                </Tab.Navigator>
            ):(<></>)}
        </>
  );
}
