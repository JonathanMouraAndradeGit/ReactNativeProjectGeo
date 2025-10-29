import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default function FinalPage() {
    const [OrderList, setOrderList] = useState<any[]>([])

    useFocusEffect(
        React.useCallback(() => {
            let getO = async () => {
                let result = await getOrders()
                setOrderList(result)
            }
            getO()
        }, [])
    );

    useEffect(() => {
        let getO = async () => {
            let result = await getOrders()
            setOrderList(result)
        }
        getO()
    }, []);
    async function getOrders() {
        try {
            const response = await fetch("http://localhost:3000/pedidos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(e => e.json());
            //console.log("informções obtidas")
            //console.log(response)
            return response
        } catch (err) {
            console.error("Erro ao buscar:", err);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerTitle}>Order List</Text>

            <ScrollView
                horizontal={false}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {OrderList.map((el: any, i: number) => (
                    <View key={i} style={styles.orderContainer}>
                        <Text style={styles.orderId}>Pedido #{el.id}</Text>

                        {el.items?.map((el2: any, n: number) => (
                            <View key={`${i}-${n}`} style={styles.itemInfo}>
                                <Text style={styles.title}>{el2.name}</Text>
                                <Text style={styles.desc}>Quantidade: {el2.qtd}</Text>
                                <Text style={styles.desc}>Preço: R$ {el2.price}</Text>
                                <Text style={styles.total}>
                                    Total: R$ {(el2.qtd * el2.price).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    contentContainer: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // sombra no Android
    },
    orderId: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#ff6600",
    },
    itemInfo: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    desc: {
        fontSize: 14,
        color: "#555",
    },
    total: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#222",
        marginTop: 4,
    },
});