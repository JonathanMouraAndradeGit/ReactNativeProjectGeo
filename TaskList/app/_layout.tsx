
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import Comp from './comp';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [lst,setLst] = useState<any[]>([])
  const [inp,setInp] = useState("")
  function insertInp(txt:string){
    setInp(txt)
  }
  function submit() {
    if (inp && inp.length > 1) {
      setLst((prevLst) => [...prevLst, inp]);
      setInp("");
    }
  }
  function delTask(num:number){
    let arr = lst.filter((el,i)=>{
      if(num != i){
        return el
      }
    })
    setLst(arr)
  }
  return (
    <GestureHandlerRootView style={styles.mainC}>
      <Text style={styles.titleContainer}>Task List</Text>
      <View style={styles.con}>
        <View style={styles.inputTaskC}>
          <Text style={styles.fieldLabel}>Task Name</Text>
          <TextInput style={styles.inputField} keyboardType="ascii-capable" placeholder='#NAME' onChangeText={(e)=>insertInp(e)}></TextInput>
          <TouchableOpacity style={styles.btnC} onPress={submit}>
            <Text style={styles.btnLabel}>Sumit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollC} contentContainerStyle={styles.scrollC2}>
          {
            lst && lst.length > 0 ? (lst.map((e,i)=>{
              return <Comp desc={e} fun={delTask} index={i} key={i}></Comp>
            })) : <Text></Text>
          }
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  mainC:{
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor:"red"
  },
  con:{
    width:"100%",
    height:"90%",
    alignItems:"center",
    justifyContent:"center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor:"white",
    marginTop: "auto",
    flexDirection:"column",
    padding: 10,
    gap: 10
  },
  titleContainer: {
    fontSize: 50,
    color:"white",
    textAlign:"center",
    width:"100%",
    marginBlock: "auto",
    textTransform: "uppercase"
  },
  inputTaskC:{
    width:"90%",
    height:"25%",
    backgroundColor:"white",
    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems:"center",
    justifyContent:"center",
    padding: 20,
    gap: 5
  },
  inputField:{
    width:"100%",
    height: "25%",
    backgroundColor:"lightgray",
    borderRadius: 50,
    padding:2
  },
  fieldLabel:{
    width: "100%",
    fontSize: 30,
    textTransform:"uppercase",
    textAlign: "left"
  },
  btnC:{
    width: "70%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"red",
    height: "30%",
    borderRadius: 5
  },
  btnLabel:{
    fontSize: 30,
    color:"white",
    textTransform:"uppercase"
  },
  scrollC:{
    width:"90%",
    height:"100%",
    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
    borderRadius: 5
  },
  scrollC2:{
    width: "100%",
    padding: 10,
    alignItems:"center",
    justifyContent:"center",
    gap:10

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
