import React, { useEffect, useState } from "react";
import {View, Text, Dimensions, StyleSheet} from 'react-native';
// import { LineChart } from "react-native-charts-wrapper";
import { LineChart } from "react-native-chart-kit";
import {Select} from 'native-base'
import { NativeBaseProvider } from "native-base";
import { db } from "./src/firebase/config";
import { collection, getDocs, where, query, Query, orderBy } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";





export default function ChartView(props){

    const [months, setMonths] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])


    const labs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [income, setIncome] = useState([1, 2, 3, 4])
    const [expense, setExpense] = useState([4, 3, 6, 9])
    const isFocused = useIsFocused()
    const [showIncome, setShowIncome] = useState(income);
    const [showExpense, setShowExpense] = useState(expense);
    const [labels, setLabels] = useState(labs);

    const [incStat, setIncStat] = useState(true);
    const [expStat, setExpStat] = useState(true);

    async function getIncomeData(){
        setIncome([])
        setShowIncome([])
        for(let i=1; i<=12; i++){
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), where('tag', '==', 'inc'), where('month', '==', i), orderBy('ts'))
            const d = await getDocs(q)
            // const arr = d.docs.map((doc)=>doc.data().price);
            let sum = 0;

            d.docs.map((dd)=>{
                sum += dd.data().price;
            })
            setIncome((inc)=>[...inc, sum])
            setShowIncome(income)
            
        }
    }

    async function getExpenseData(){
        setExpense([])
        setShowExpense([])
        for(let i=1; i<=12; i++){
            const q = query(collection(db, 'maincoll/expenses/allExpenses'), where('tag', '==', 'exp'), where('month', '==', i), orderBy('ts'))
            const d = await getDocs(q)
            const arr = d.docs.map((doc)=>doc.data().price);
            let sum = 0;

            d.docs.map((dd)=>{
                sum += dd.data().price;
            })
            setExpense((exp)=>[...exp, sum])
            setShowExpense(expense)

        }
        
        
        
    }


    function handleValChange(lt){
        console.log('Income would be : '+ income.slice(0, lt))
        console.log('Expense would be : '+ expense.slice(0, lt))
        
        const dt = new Date()
        const mo = dt.getMonth()
        console.log('Date : '+mo)
        
            if((mo==0 || mo==1 || mo==2)&&lt==3){
                console.log('income : '+income.slice(0, 2) + ' and exp : '+expense.slice(0, 2))
                setLabels(['Jan', 'Feb', 'Mar'])
                setShowIncome(income.slice(0, 3))
                setShowExpense(expense.slice(0, 3))
            }
            if((mo==3 || mo==4 || mo==5)&&lt==3){
                setLabels(['Apr', 'May', 'Jun'])
                console.log('income : '+income.slice(3, 5) + ' and exp : '+expense.slice(3, 5))
                setShowIncome(income.slice(3, 6))
                setShowExpense(expense.slice(3, 6))
            }
            if((mo==6 || mo==7 || mo==8)&&lt==3){
                setLabels(['Jul', 'Aug', 'Sep'])
                console.log('income : '+income.slice(6, 8) + ' and exp : '+expense.slice(6, 8))
                setShowIncome(income.slice(6, 9))
                setShowExpense(expense.slice(6, 9))
            }
            if((mo==9 || mo==10 || mo==11)&&lt==3){
                setLabels(['Oct', 'Nov', 'Dec'])
                console.log('income : '+income.slice(9, 12) + ' and exp : '+expense.slice(9, 12))
                setShowIncome(income.slice(9, 12))
                setShowExpense(expense.slice(9, 12))
            }


            if((mo >=0 && mo<=5)&&lt==6){
                setLabels(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])
                console.log('income : '+income.slice(0, 5) + ' and exp : '+expense.slice(0, 5))
                setShowIncome(income.slice(0, 6))
                setShowExpense(expense.slice(0, 6))
            }
            if((mo >=6 && mo <=11)&&lt==6){
                setLabels(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
                console.log('income : '+income.slice(6, 11) + ' and exp : '+expense.slice(6, 11))
                setShowIncome(income.slice(6, 12))
                setShowExpense(expense.slice(6, 12))
            }
            
            if(lt == 12){
                setLabels(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
                setShowIncome(income.slice(0, 12))
                setShowExpense(expense.slice(0, 12))
            }


        // if(dt.getMonth() != 0 && dt.getMonth() !=12 && lt == 3){
        //     console.log('in iff')
        //     setShowIncome(income.slice(dt.getMonth()-1, dt.getMonth()+1))
        //     setShowExpense(expense.slice(dt.getMonth()-1, dt.getMonth()+1))
        //     return
        // }
        // if(dt.getMonth() >= 2 && dt.getMonth() <=9 && lt == 6){
        //     console.log('in iff 2')
        //     setShowIncome(income.slice(dt.getMonth()-3), dt.getMonth()+2)
        //     setShowExpense(expense.slice(dt.getMonth()-3, dt.getMonth()+2))
        // }
        // else{
        //     console.log('in else with limit '+lt)
        //     setShowIncome(income.slice(0, lt))
        //     setShowExpense(expense.slice(0,lt))
        // }
        
    }


    useEffect(()=>{
        if(isFocused){
            getIncomeData()
            getExpenseData()
        }
    }, [props, isFocused])





    const data = {
        labels: labels,
        datasets: [
            (incStat==true)?{
                // fill: false,
                data: showIncome,
                color: (opacity)=> `rgba(0, 255, 0, ${opacity})`,
            }:{
                data: [],
                color: (opacity)=> `rgba(0, 255, 0, ${opacity})`,
            },

            (expStat==true)?{
                data: showExpense,
                color: (opacity)=> `rgba(220, 0, 0, ${opacity})`,
            }:{
                data: [],
                color: (opacity)=> `rgba(0, 255, 0, ${opacity})`,
            },
        ],
    }


    return(
            <View>           
            <Text style={{color: 'white', fontSize:18, padding: 10, paddingTop: 20,}}>Take a look on how you're doing...</Text>
            <LineChart
                withInnerLines={true}
                // withVerticalLines={true}
                verticalLabelRotation={70}
                horizontalLabelRotation={60}
                // fromZero={true}
                withOuterLines={false}
                withShadow={false}
                data={data}
                yLabelsOffset={40}
                width={Dimensions.get('screen').width - 10} 
                height={450}
                
                // yAxisLabel="Rs"
                chartConfig={{
                    // backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 0, 
                    color: (opacity)=> `rgba(0, 0, 0, ${opacity})`,
                    style: {borderRadius: 0}, 
                    strokeWidth: 4,
                }}
                style={{marginVertical: 0, borderRadius: 5, paddingTop: 10, paddingBottom: 0, marginLeft: 10, marginRight: 10}}

            />

            
                <NativeBaseProvider>
                <View style={styles.filters}>
                <Select selectedValue={''}  style={{}} width={(Dimensions.get('screen').width/2)-30} accessibilityLabel="Months" placeholder="Months" 
                    onValueChange={(changed)=>{setMonths(changed[0]); handleValChange(changed[1])}}
                >
                    <Select.Item label="3 Months" value={[['Jan', 'Feb', 'Mar'], 3]} />
                    <Select.Item label="6 Months" value={[['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], 6]} />
                    <Select.Item label="All" value={[['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 12]} />
                </Select>

                <Select selectedValue={''}  style={{}} width={(Dimensions.get('screen').width/2)-30} accessibilityLabel="Months" placeholder="Months" 
                    onValueChange={(val)=>{
                        if(val=='inc'){
                            setIncStat(true);
                            setExpStat(false);
                        }
                        
                        if(val=='exp'){
                            setIncStat(false);
                            setExpStat(true);
                        }
                        
                        if(val=='both'){
                            setIncStat(true);
                            setExpStat(true);
                        }
                        
                    }}
                >
                    <Select.Item label="Only Income" value={'inc'} />
                    <Select.Item label="Only Expense" value={'exp'} />
                    <Select.Item label="Both" value={'both'} />
                </Select>
                </View>
                </NativeBaseProvider>
                

            


        </View>
        
    );
}

const styles = StyleSheet.create({
    filters : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        backgroundColor : 'pink', 
        borderRadius: 7,
        color: 'black'
    }
})