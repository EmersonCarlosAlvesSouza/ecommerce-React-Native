//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import {AppProvider} from './src/context/AppContext'
import Login from './src/pages/Login'
import AppContacts from './src/pages/TelaPrincipal';
import Contacts from './src/pages/Carrinho';
import Information from './src/pages/Information';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={AppContacts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Contacts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
    return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TelaPrincipal" component={Tabs} />
          <Stack.Screen name="Information" component={Information} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
