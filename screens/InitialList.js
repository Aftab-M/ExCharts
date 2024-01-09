import { StyleSheet, Text, Pressable, Touchable, TouchableOpacity, TouchableHighlight } from "react-native";
import { View, Button } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../src/firebase/config";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";



export default function InitialList(){
    
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const [list, setList] = useState([])
    const date = new Date()
    useEffect(()=>{
        async function getTransactions(){
            setList([])
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), where('month', '==', date.getMonth()+1), orderBy('ts'))
            const d = await getDocs(q);
            d.forEach((dd)=>{
                console.log(dd.data())
            })
            // setList(d)
            const arr = d.docs.map((doc)=>doc.data())
            console.log(arr)
            setList([...arr].reverse())
        }
        getTransactions()
    }, [isFocused])




    return(
        <View>
            <Text style={{color: 'white', fontSize:18, padding: 10, paddingTop: 20,}}>Your transactions this month...</Text>
            <View style={styles.initList}>
            {list.map((e)=>(
                <View key={e} style={styles.listCont}>
                    <View>
                        <Text style={styles.txt} >
                            {e.title}
                        </Text>
                        <Text style={styles.dsc}>
                            {e.desc}
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, color: (e.tag=='inc')?'green':'red'}}>{e.price}</Text>
                    </View>
                </View>
                
            ))}
            </View>
            
            <TouchableOpacity 
            
            style={styles.btn} onPress={()=>{navigation.navigate('ExpenseList')}}>
                <Text>View All</Text>
            </TouchableOpacity>
            
        </View>
        
    );
}


const styles = StyleSheet.create({
    listCont:{
        padding: 10,
        backgroundColor: '#efcfe3',
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6, 

    },
    initList:{
        padding: 10,
        backgroundColor: '#be5683',
        borderRadius: 10, 
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,

    },
    txt:{
        
        fontSize: 15,
        fontWeight: 'bold'
    },
    dsc:{
        marginTop: 15,
        marginBottom: 3,
        fontSize: 12,
    },

    btn: {
        backgroundColor: 'white', 
        padding: 10, 
        margin: 10, 
        alignItems: 'center',
        fontSize: 15,
        color: 'black',
        elevation: 3,
        borderRadius: 10,
        marginBottom: 60,
    }



    
})