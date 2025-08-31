import { View,TextInput,Text,Image } from "react-native"
import { StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
export default function ProfLst(props){
    const navigation = useNavigation();
    function tf(obj){
        //console.log(obj.firstName)
        navigation.navigate('Profile',{obj:props.obj})
    }
    return (
        <View style={styles.Container} onTouchEnd={(e)=>tf(props.obj)}>
            <View style={styles.child1}>
                <Image source={require('../assets/imgs/user_17740838.png')}
                style={{ width:"100%", height:"100%" }}></Image>
            </View>
            <View style={styles.child2}>
                <Text style={styles.desc}>{props.obj.name}</Text> 
                <Text style={styles.desc}>{props.number}</Text> 
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Container:{
        width:"100%",
        maxHeight:"50",
        backgroundColor:"red",
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        borderWidth: 0,
        borderColor:"none",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow:"0px 2px 5px 0px rgba(0,0,0,0.5)"
    },
    child1:{
        height:"100%",
        aspectRatio: 1/1,
        backgroundColor:"white",
        flex: 1,
        position: "relative",
        alignItems:"center",
        justifyContent:"center",
        padding: 10
    },
    child2:{
        height:"100%",
        width:"80%",
        backgroundColor:"black",
        paddingLeft: "10",
    },
    desc:{
        color:"white",
    }
})