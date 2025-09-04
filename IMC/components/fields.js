import React from "react";
import { View,TextInput,Text } from "react-native";
import { StyleSheet } from "react-native";
export default function Fields(props){
return(
<View style={style.con}>
<Text style={style.tit}>peso</Text>
<TextInput style={style.inp} placeholder="#EX:30"
keyboardType="numeric" onChangeText={(e)=>props.setPesoF(e)}></TextInput>
<Text style={style.tit}>altura</Text>
<TextInput style={style.inp} placeholder="#EX:30"
keyboardType="numeric"
onChangeText={(e)=>props.setAlturaF(e)}></TextInput>
</View>
)
}
const style = StyleSheet.create({
con:{
    flex:0,
    alignContent:"center",
    justifyContent:"center",
    width: "100%",
    height: "45%",
    gap:10,
    backgroundColor: "white",
    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
    margin: 10,
    padding: 20,
    borderRadius: 20,
},
tit:{
fontFamily:"Arial",
fontWeight:"bolder",
fontSize: 30,
textTransform:"uppercase"
},
inp:{
width: "100%",
height: "20%",
borderRadius: 15,
backgroundColor:"#D3D3D3",
color:"white",
padding: 5,
}
})