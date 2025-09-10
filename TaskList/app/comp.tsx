import React from "react"
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
export default function Comp(props:any){
    function delFunc(){
        props.fun(props.index)
    }
    return (
        <TouchableOpacity style={styles.mainC1} onLongPress ={delFunc}>
            <Text style={styles.mainTxt1}>{props.desc}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainC1:{
        width:"70%",
        height:40,
        borderRadius: 10,
        boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
        alignItems:"center",
        justifyContent:"center"
    },
    mainTxt1:{
        fontSize:30,
        textTransform:"uppercase"
    }
})