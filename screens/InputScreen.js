import { Touchable, ToastAndroid, Button, StyleSheet, Text, Dimensions, TextInput, View, Alert, ScrollView, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase/config';
import DatePicker from 'react-native-datepicker'




export default function InputScreen({navigation}){

    const [expenseTitle, setExpenseTitle] = useState('')
    const [expenseDesc, setExpenseDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [inc, setInc] = useState('');
    const date = new Date() 
    
    const [dtt, setDate] = useState(date)

    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth()+1)
    const [year, setYear] = useState(date.getFullYear())
    


    useEffect(()=>{
      console.log('Date is : '+dtt)
    }, [])
    
    // const alertEmpty = Alert.alert('Enter some title !', 'Please enter the title')


    function sendData(){
      if(expenseTitle==''){}
      if(expenseTitle!='' && price!=0 && inc!=''){
        addDoc(collection(db, 'maincoll/expenses/allExpenses/'), {
          title: expenseTitle,
          desc: expenseDesc=='' ? '...' : expenseDesc,
          price: Number(price),
          month: Number(month),
          day: day,
          year: year,
          tag: inc,
          ts : dtt,
        }).then(()=>{
          ToastAndroid.show('Transaction added !', ToastAndroid.SHORT)
          setExpenseTitle('')
          setExpenseDesc('')
          setPrice(0)
          setInc('')
          setDate(date.getDate())
          setMonth(date.getMonth()+1)
          setYear(date.getFullYear())
        }).catch((err)=>{
          console.log('Error !')
        });
  
      }
    }



    return(
        <View>
          <ScrollView>
          <View style={styles.inputView}>
          <Text style={{fontSize:25, color: 'white'}}>Add a New Expense</Text>
          <TextInput style={inputStyle.expTitle} placeholder='Name' placeholderTextColor={'grey'} onChangeText={(t)=>{setExpenseTitle(t)}}  value={expenseTitle} />
          <TextInput style={inputStyle.expDesc} placeholder='Details' placeholderTextColor={'grey'} value={expenseDesc} onChangeText={(t)=>{setExpenseDesc(t)}} />
          <TextInput style={inputStyle.price} placeholder='Price' placeholderTextColor={'grey'} selectionColor={'white'} cursorColor={'white'} keyboardType='numeric' value={price.toString()} onChangeText={(t)=>setPrice(t)} />
          <View 
            style={{
              display: 'flex', 
              flexDirection: 'row',
              gap: 20,
              marginTop: 20,
              marginBottom: 15,
            }}
          >
             <Text onPress={()=>{setInc('inc')}} style={{borderColor: (inc=='inc')?'black':'green', borderWidth:1, borderColor:'green', fontSize: 17, color: (inc=='inc')?'white':'green', backgroundColor: (inc=='inc')?'green':'transparent', borderRadius: 5, padding: 10,}}>Income</Text> 
             <Text onPress={()=>{setInc('exp')}} style={{borderColor: (inc=='exp')?'black':'red', borderWidth:1, borderColor:'red', fontSize: 17, color: (inc=='exp')?'black':'red', backgroundColor: (inc=='exp')?'red':'transparent', borderRadius: 5, padding: 10}}>Expense</Text> 
          </View>
          <View
            style={{
              display: 'flex', 
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <TextInput 
              placeholder='DD' 
              placeholderTextColor={'grey'}
              style={inputStyle.dat} 
              keyboardType='numeric'
              value={day.toString()}
              onChangeText={(t)=>{setDay(t)}}
            />
            <TextInput 
              placeholder='MM' 
              placeholderTextColor={'grey'}
              style={inputStyle.dat} 
              keyboardType='numeric'
              value={month.toString()}
              onChangeText={(t)=>{setMonth(t)}}
            />
            <TextInput 
              placeholder='YYYY' 
              placeholderTextColor={'grey'}
              style={inputStyle.dat} 
              keyboardType='numeric'
              value={year.toString()}
              onChangeText={(t)=>{setYear(t)}}
            />
          </View>
          <Button style={inputStyle.btnStyle} title='Add' onPress={()=>{sendData()}} />
          <StatusBar style="auto" />
        </View>
          </ScrollView>
          
        </View>
    );
}

const styles = StyleSheet.create({
    inputView : {
        color: 'white',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#182C61',
        padding: 20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      },
      container: {
        display: 'flex',
        color: 'white',
        gap: 20,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
      },     
})


const inputStyle = StyleSheet.create({
    expTitle : {
      color: 'white',
      padding : 10,
      borderWidth: 1,
      borderRadius: 5, 
      borderColor: 'white',
      textAlign : 'center',
      width: Dimensions.get('window').width - 50,
      fontSize: 20,
    },
    expDesc : {
      color: 'white',
      padding : 10,
      borderWidth: 1,
      borderRadius: 5, 
      borderColor: 'white',
      textAlign : 'center',
      width: Dimensions.get('window').width - 50,
      fontSize: 18,
    },
    price: {
      color: 'white',
      width: Dimensions.get('screen').width - 150,
      borderWidth: 1,
      borderRadius: 5, 
      textAlign: 'center',
      padding: 10,
      fontSize: 18, 
    },
    btnStyle : {
      backgroundColor: '#20232a',
      color: '#20232a',
      fontSize: 30,
      
    },


    dat:{
      fontSize: 20, 
      color: 'white',
      paddingVertical: 8, 
      paddingHorizontal: 20,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 7,
      textAlign: 'center',
    }

  })
  