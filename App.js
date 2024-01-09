import { StatusBar } from 'expo-status-bar';
import { Touchable, Button, StyleSheet, Text, Dimensions, TextInput, View, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import ChartView from './ChartView';
import InputScreen from './screens/InputScreen';
import { FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExpenseList from './screens/ExpenseList';
import { registerRootComponent } from 'expo';


export default function App() {

  const Stack = createNativeStackNavigator()

  const showAlert = () =>{
    Alert.alert('Add Expense ?', 'Are you sure you want to add this expense dude ??', [
      {
        text:'Yes', 
        onPress: ()=>{console.log('Pressed "OOOO YEAAHHH"')}
      },
      {
        text:'No', 
        onPress: ()=>{console.log('Pressed "YOU BET !!"')}
      }
    ], )
  }


  return (
    <NavigationContainer>
    <Stack.Navigator>
      
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{title:'Ayo What upp !', }}
      />
      <Stack.Screen
        name='InputExpense'
        component={InputScreen}
      />
      <Stack.Screen 
        name='ExpenseList'
        component={ExpenseList}
        options={{title:'Transactions'}}
        />
      
      

    </Stack.Navigator>
    
    </NavigationContainer>
  );
}





registerRootComponent(App)