import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,TextInput } from 'react-native';
import { useEffect,useState } from 'react';
import * as Contacts from "expo-contacts"
import { CONTACTS } from 'expo-permissions';
import ProfLst from './components/ProfLst';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Main from './components/Main';
import Screen2 from './components/Screen2';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Profile" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:"100%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Frm:{
    width:"70%",
    height:"80",
    margin: "20",
    padding: "10",
    backgroundColor:"white",
    borderRadius: 10,
    boxShadow:"0px 5px 10px 0px rgba(0,0,0,0.5)",
  },
  inp:{
    backgroundColor:'#d3d3d3',
    borderRadius: 20,
    padding: 10,
    color: "white"
  },
  scroll:{
        backgroundColor:"white",
        width:"70%",
        height:"50%",
        borderWidth: 4,
        borderRadius: 20,
        flexDirection: "column",
        borderColor: "white",
        padding: 5,
        paddingBottom: 20,

        boxShadow:"0px 5px 10px 0px rgba(0,0,0,0.5)",

        flex: 1,
        maxHeight: "50%",
        gap:5
  }
});
