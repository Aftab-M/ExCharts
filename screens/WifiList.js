import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import WifiManager from 'react-native-wifi-reborn'



export default function WifiList({navigation}){

    const [wifiList, setWifiList] = useState(['Never']);

    useEffect(()=>{
        const getNetworks = async() =>{
            try{
                const nws = await WifiManager.loadWifiList();
                console.log('Networks are : '+nws)
                setWifiList(nws)
            }
            catch(err){console.log('Error! : '+err)}
        }
        getNetworks()
    }, [])

    return(
        <View>
            {wifiList.map((e)=>(
                <Text>{e}</Text>
            ))}
        </View>
    );
}



