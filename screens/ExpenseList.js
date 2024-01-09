import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { db } from "../src/firebase/config";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";

export default function ExpenseList({navigation}){
    const [list, setList] = useState([])

    useEffect(()=>{
        
        async function getExpenses(){
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), where('tag','==','inc', true));
            const ss = await getDocs(q)
            ss.forEach((d)=>{
                console.log(d.data())
            })
        }

        // getExpenses()

        async function getIncomes(){
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), where('tag', '==', 'exp'))
            const d = await getDocs(q)
            d.forEach((dd)=>{
                console.log(dd.data())
            })
        }

        // getIncomes()


        async function getTransactions(){
            setList([])
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), orderBy('ts'))
            const d = await getDocs(q);
            const arr = d.docs.map((dc)=>dc.data())
            // console.log(arr)
            setList([...arr].reverse())
            // setList(d)
        }
        getTransactions()



    },[])

    return(
        <View style={styles.mainList}>
            <ScrollView>
            {list.map((e)=>(
                <View style={(e.tag=='inc') ? styles.listContGreen :  styles.listContRed }>
                    <View style={{display:'flex', alignItems: 'flex-start'}}>
                    <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>{e.title}</Text>
                    <Text style={{color: 'white', marginTop: 6}}>{e.desc} </Text>
                    </View>
                    <View style={{display: 'flex', alignItems: 'flex-end'}}>
                    <Text style={{color: 'white', fontSize: 25}}>{e.price}</Text>
                    <Text style={{color: 'white', marginTop: 15}}>{e.day + '/' + e.month + '/' + e.year}</Text>
                    </View>
                    
                </View>
            ))}

            </ScrollView>
            
        </View>
    );
}


const styles = StyleSheet.create({
    mainList:{
        backgroundColor: 'black',
        height: Dimensions.get('screen').height,
    },
    listContGreen:{
        padding: 15,
        backgroundColor: 'green',
        margin: 5,
        marginTop: 10,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6, 

    },
    listContRed:{
        padding: 15,
        backgroundColor: 'red',
        margin: 5,
        marginTop: 10,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6, 

    },
    
})