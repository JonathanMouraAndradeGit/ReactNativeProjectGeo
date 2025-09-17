import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { View,Text,TouchableOpacity,Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [quest,setQuest] = useState([])
  const [current,setCurrent]=useState(0)
  const [finish,setFinish]=useState(false)
  const [answers,setAnswers]=useState(0)
  useEffect(()=>{
    const result = async ()=>{
      let quests = await getData()
      console.log(quests)
      setQuest(quests)
    }
    result()
  },[])
  async function getData(){
    return await fetch("http://localhost:3000/quiz",{
      method:"GET",
      headers:{
        "Content-Type":"Application/json"
      }
    }).then((el)=>el.json())
  }
  function registerPress(obj:any){
    console.log(`${obj["desc"]} - correct: ${obj["correct"]}`)
    let lenArr = quest.length
    if(obj["correct"]){
      setAnswers(answers+1)
    }
    if(lenArr > (current+1)){
      setCurrent(current+1)
    }else{
      console.log("question ended")
      setFinish(true)
    }
  }
  function reset(){
    setFinish(false)
    setCurrent(0)
    setAnswers(0)
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={style.Container}>
        <Text style={style.Title}>quiz</Text>
        <View style={style.mainC}>
            { quest.length > 0 ? ( finish == false ? 
              <View style={style.questMainC}>
                <Text>{quest[current]["txt"]}</Text>
                <View style={style.questC}>
                  {
                      Array.from(quest[current]["options"]).map((el:any,i)=>{
                          return <TouchableOpacity style={style.btnA} key={i} onPress={()=>registerPress(el)}>
                                  <Text style={style.btnSTxt}>{el["desc"]}</Text>
                                 </TouchableOpacity>
                      })
                  }
                </View>
              </View> : 
              <View>
                <Text>Você acertou:{((answers*100)/quest.length).toFixed(2)}%</Text>
                <Button title='Reset' onPress={reset}></Button>
              </View>
            ) : <Text>Loading</Text>}
            <Text></Text>
            <View>
              
            </View>
        </View>
      </View>
    </ThemeProvider>
  );
}


const style = StyleSheet.create({
  Container:{
    width:"100%",
    height:"100%",
    flex:1,
    backgroundColor:"purple"
  },
  Title:{
    width:"100%",
    fontSize:50,
    textTransform:"uppercase",
    color:"white",
    textAlign:"center"
  },
  mainC:{
    width:"100%",
    height:"80%",
    marginTop:"auto",
    marginBottom:0,
    backgroundColor:"white",
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    alignItems:"center",
    justifyContent:"center"
  },
  questMainC:{
    width:"70%",
    height:"70%",
    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
    alignContent:"center",
    justifyContent:"center",
    padding: 10,
    gap: 15
  },
  questC:{
    justifyContent:"center",
    alignItems:"center",
    gap:5
  },
  btnA:{
    width:"30%",
    aspectRatio:1/0.25,
    backgroundColor:"black",
    borderRadius: 15,
    alignItems:"center",
    justifyContent:"center"
  },
  btnSTxt:{
    color:"white",
    fontSize:20
  }
})