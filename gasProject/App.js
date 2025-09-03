import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TextInput, Button,TouchableOpacity } from 'react-native';
import { useState,useEffect,useRef } from 'react';

export default function App() {
  const [obj,setObg] = useState({al:0,gas:0})
  const vl1 = useRef();
  const [screen,setScreen] = useState(true)
  function calc(){
    console.log("check"+obj.al+" - "+obj.gas)
    setScreen(false)
  }
  function chengeValue(name,e){
    let st = obj;
    st = {...obj,[name]:e}
    setObg(st)
  }
  function goBack(){
    setScreen(true)
  }
  function checkBigger(){
    if(parseFloat(obj.al) > parseFloat(obj.gas)){
      console.log(obj)
      console.log("al is greater than gas")
      return <Text style={styles.txtMain}>Compensa usar Gasolina</Text>
    }
    console.log(obj)
    console.log("gas is greater than al")
    return <Text style={styles.txtMain}>Compensa usar Álcool</Text> 
  }
  return (
    <View style={styles.container}>
      {
        screen ? 
        <View>
          <View style={styles.con}>
            <View style={styles.imgC}>
              <Image source={require('./assets/imgs/gas-pump.png')} style={{width: "100%", height: "100%"}} />
            </View>
            <Text style={styles.txtMain}>Qual melhor opção?</Text> 
            <Text style={styles.txtV}>Álcool (preço por litro):</Text> 
            <TextInput style={styles.inp} placeholder='#Alcool' keyboardType="numeric" onChangeText={(e)=>chengeValue("al",e)}></TextInput>
            <Text style={styles.txtV}>Gasolina (preço por litro):</Text> 
            <TextInput style={styles.inp} placeholder='#Gasolina' keyboardType="numeric" onChangeText={(e)=>chengeValue("gas",e)}></TextInput>
            <TouchableOpacity style={styles.btn} onPress={()=>calc()}>
              <Text style={styles.txtCenter} onPress={()=>calc()}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>
        : <View>
          <View style={styles.con}>
            <View style={styles.imgC}>
              <Image source={require('./assets/imgs/oil-barrel.png')} style={{width: "100%", height: "100%"}} />
            </View>
            {
              checkBigger() 
            }
            <Text style={styles.txtCenter}>Álcool: R$ {obj.al}</Text>
            <Text style={styles.txtCenter}>Gasolina: R$ {obj.gas}</Text>
            <TouchableOpacity style={styles.btn} onPress={()=>goBack()}>
              <Text style={styles.txtCenter}onPress={()=>goBack()}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    alignItems:"center",
    justifyContent:"center",
  },
  txtV:{
    width: "100%",
    textAlign:"left",
    color:"white",
    fontSize: 20
  },
  con:{
    flex:0,
    alignContent:"center",
    alignItems:"center",
    width:"100%",
    height: 800,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    gap: 20
  },
  txtMain:{
    textAlign:"center",
    fontSize: 50,
    color:"white"
  },
  inp:{
    flex:0,
    width: 300,
    height: 50,
    backgroundColor:"white",
    borderRadius: "10",
    borderRadius: 5
  },
  imgC:{
    width: "50%",
    backgroundColor: "white",
    aspectRatio: "1/1",
    overflow: "hidden",
    padding: 40,
    borderRadius: "50%",

  },
  btn:{
    backgroundColor:"red",
    width: "100%",
    aspectRatio: 1/0.1,
    borderRadius: 4,
    alignItems:"center",
    justifyContent:"center",
    color:"red"
  },
  txtCenter:{
    color:"white",
    fontSize: 20
  }
});
