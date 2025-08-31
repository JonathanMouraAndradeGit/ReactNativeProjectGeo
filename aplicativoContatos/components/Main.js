import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import * as Contacts from "expo-contacts"
import ProfLst from "./ProfLst";
import { useEffect,useState } from "react";
export default function Main(props) {
    const [load, setLoad] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState([]);
    function changeFilter(txt) {
        //console.log(txt)
        let regex = new RegExp(`^${txt}`, 'gi')
        if (txt != null && txt.trim().length > 0) {
            //console.log("this is the txt " + txt)
            let result = contacts.filter((el) => regex.test(el.name))
            //console.log("setting new qtd " + result.length)
            setFilter(result)
        } else {
            //console.log("loading all")
            setFilter(contacts)
        }
    }
    useEffect(() => {
        console.log("permission here");
        async function func1() {
            let { status } = Contacts.requestPermissionsAsync();//await Permissions.askAsync(Permissions.CONTACTS);
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers], // opcional
            });
            //console.log(data.length)
            //console.log("obj is ");
            //console.log(data[5].firstName)
            if (data.length > 0) {
                setLoad(true);
                setContacts(data)
                setFilter(data)
            }
        };
        func1();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.Frm}>
                <Text>Filter</Text>
                <TextInput style={styles.inp} placeholder='#Filtrar' onChangeText={(e) => changeFilter(e)}></TextInput>
            </View>
            <ScrollView style={styles.scroll} contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 5,
                padding: 10,
                paddingBottom: 25,
            }}>
                {
                    filter && filter.length > 0 ?
                        filter.map((el, i) => {
                            if (el != null) {
                                return <ProfLst key={i} obj={el} number={el.phoneNumbers[0].number}></ProfLst>
                            }
                        })
                        : <Text>No contacts</Text>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Frm: {
        width: "70%",
        height: "80",
        margin: "20",
        padding: "10",
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",
    },
    inp: {
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        padding: 10,
        color: "white"
    },
    scroll: {
        backgroundColor: "white",
        width: "70%",
        height: "50%",
        borderWidth: 4,
        borderRadius: 20,
        flexDirection: "column",
        borderColor: "white",
        padding: 5,
        paddingBottom: 20,

        boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.5)",

        flex: 1,
        maxHeight: "50%",
        gap: 5
    }
});