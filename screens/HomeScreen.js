import { Touchable, Button, StyleSheet, Text, Dimensions, TextInput, View, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ChartView from '../ChartView';
import { FAB } from 'react-native-paper';
import InitialList from './InitialList';

export default function HomeScreen({navigation}){
    return(
    <View style={styles.container}>
      <ScrollView>
        <ChartView/>
        <InitialList/>
        </ScrollView>
        <FAB
            style={styles.fab}
            icon='plus'
            onPress={()=>{console.log('Pressed the FAB'); navigation.navigate('InputExpense')}}
          />
      
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      gap: 20,
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#232D3F',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    fab:{
      position: 'absolute',
      bottom: 30, 
      right: 30,
      backgroundColor: 'lightpink',
    }
  });
  