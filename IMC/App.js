import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import Fields from './components/fields';
export default function App() {
  const [altura, setAltura] = useState(0)
  const [peso, setPeso] = useState(0)
  const [imc, setImc] = useState(null)
  function setAlturaF(val) {
    if (val != null) {
      setAltura(val)
    }
  }
  function setPesoF(val) {
    if (val != null) {
      setPeso(val)
    }
  }
  function calc() {
    if (altura != null && peso != null) {
      let resultado = (peso / (altura * altura)).toFixed(2)
      if (!isNaN(resultado) && isFinite(resultado)) {
        setImc(resultado);
      } else {
        setImc(null);
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>IMC</Text>
      <Fields setAlturaF={setAlturaF} setPesoF={setPesoF}></Fields>
      <TouchableOpacity style={styles.newBtn} onPress={calc}>
        <Text style={styles.btnTxt}>Submits</Text>
      </TouchableOpacity>
      {imc != null ?
        <Text style={styles.msg}>seu IMC é {imc}</Text>
        : <Text style={styles.msg}>nenhum dado fornecido</Text>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 30
  },
  titleTxt:{
    fontSize:30,
    color: "red",
    textTransform:"uppercase",
    fontWeight:"bold"
  },
  newBtn:{
    flex:0,
    alignItems:"center",
    justifyContent:"center",
    width: "100%",
    backgroundColor:"red",
    aspectRatio: "1/0.25",
    borderRadius: 10,
    boxShadow:"0px 5px 20px 0px rgba(0,0,0,0.5)"
  },
  btnTxt:{
    fontSize: 40,
    color:"white",
    textTransform:"uppercase",
  },
  msg: {
    width: "100%",
    fontFamily: "Arial",
    fontWeight: "bolder",
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center"
  }
});