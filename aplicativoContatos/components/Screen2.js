import React from "react"
import { View,Text,Button,Image,StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
export default function Screen2({ route }){
    const navigation = useNavigation();
    const { obj } = route.params
    return(
        <View style={styles.Container}>
            <View style={styles.InfoContainer}>
                <View style={styles.child1}>
                    <Image source={require("../assets/imgs/user_17740838.png")}
                    style={{width:"100%",height:"100%"}}></Image>
                </View>
                <Text>Name: { obj.name }</Text>
                <Text>Number: { obj.phoneNumbers[0].number }</Text>
                <Text>contactType: { obj.contactType }</Text>
                <Button
                    title="back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </View>
    )  
}

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        width:"100%",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    InfoContainer:{
        height: "50%",
        width: "80%",
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:"0px 5px 10px 0px rgba(0,0,0,0.5)",
        gap: 5,
        borderRadius: 10,
    },
    child1:{
        height:"50%",
        aspectRatio:1/1,
        flex: 0,
        alignContent:"center",
        alignItems:"center",
        padding: 5,
        position:"relative"
    },

})