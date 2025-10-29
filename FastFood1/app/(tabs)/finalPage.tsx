import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default function FinalPage() {
  const [objFoodLst, setObjFoodLst] = useState<any[]>([]);
  const [obj, setObj] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      let res = localStorage.getItem("myItems");
      res = res ? JSON.parse(res) : [];
      if (res && res.length > 0) {
        console.log("Found items in localStorage");
        const arr = Array.from(res).map((el: any) => ({
          id: el.idFood,
          name: el.name,
          qtd: 0,
          price: el.price,
          img: el.img,
          desc: el.desc,
        }));
        setObjFoodLst(arr);
        setObj(arr);
      }
    }, [])
  );

  useEffect(() => {
    let res: any = localStorage.getItem("myItems");
    res = res ? JSON.parse(res) : [];
    if (res && res.length > 0) {
      console.log("Found items in localStorage");
      const arr = res.map((el: any) => ({
        id: el.idFood,
        name: el.name,
        qtd: 0,
        price: el.price,
        img: el.img,
        desc: el.desc,
      }));
      setObjFoodLst(arr);
      setObj(arr);
    }
  }, []);

  function add(id: any) {
    setObj((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, qtd: el.qtd + 1 } : el
      )
    );
  }

  function sub(id: any) {
    setObj((prev) =>
      prev.map((el) =>
        el.id === id && el.qtd > 0 ? { ...el, qtd: el.qtd - 1 } : el
      )
    );
  }

  function calcTotal() {
    const amount = obj.reduce((total, el: any) => total + el.price * el.qtd, 0);
    //console.log("Total:", amount);
    return amount;
  }

  function deleteSelectedItem(id: any) {
    let result: any = localStorage.getItem("myItems");
    result = result ? JSON.parse(result) : [];

    // Filtra o item removendo o id correspondente
    const filtered = result.filter((el: any) => el.idFood !== id);

    localStorage.setItem("myItems", JSON.stringify(filtered));

    // Atualiza os estados locais
    const arr = filtered.map((el: any) => ({
      id: el.idFood,
      name: el.name,
      qtd: 0,
      price: el.price,
      img: el.img,
      desc: el.desc,
    }));

    setObjFoodLst(arr);
    setObj(arr);
    console.log("Item deleted successfully");
  }

  function calcAmount(id: any) {
    const item = obj.find((el) => el.id === id);
    return item ? item.price * item.qtd : 0;
  }
  async function insrPedido() {
    try {
      const response = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: obj,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar pedido: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pedido inserido com sucesso:", data);

      localStorage.setItem("myItems", JSON.stringify([]));

      setObjFoodLst([]);
      setObj([]);
    } catch (err) {
      console.error("Erro ao inserir pedido:", err);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerTitle}>Order Details</Text>

      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {objFoodLst.map((el: any, i) => (
          <View key={i} style={styles.containerItem}>
            <View style={styles.iconContainer}>
              {el.img && <Image style={styles.iconImage} source={el.img} />}
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.title}>{el.name}</Text>
              <Text style={styles.desc}>{el.desc}</Text>
              <Text style={styles.price}>{`R$${el.price}`}</Text>
              <TouchableOpacity style={styles.buyButton} onPress={() => deleteSelectedItem(el.id)}>
                <Text style={styles.buyButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.qtdContainer}>
              <TouchableOpacity style={styles.qtdButton} onPress={() => add(el.id)}>
                <Text style={styles.qtdButtonText}>+</Text>
              </TouchableOpacity>

              <Text style={styles.qtdText}>{obj[i]?.qtd ?? 0}</Text>

              <TouchableOpacity style={styles.qtdButton} onPress={() => sub(el.id)}>
                <Text style={styles.qtdButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.additionalContainer}>
        {objFoodLst.map((el: any, i) => (
          <View key={i} style={styles.additionalItem}>
            <Text style={styles.additionalText}>{el.name}</Text>
            <Text style={styles.additionalPrice}>{`+ R$ ${calcAmount(el.id)}`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.additionalItem}>
        <Text style={styles.additionalText}>Total</Text>
        <Text style={styles.additionalPrice}>{`R$ ${calcTotal()}`}</Text>
      </View>

      <TouchableOpacity style={styles.buyButton} onPress={insrPedido}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 10,
  },

  contentContainer: {
    width: "100%",
    paddingVertical: 8,
    gap: 10,
  },

  containerItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    alignItems: "center",
  },

  iconContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  itemInfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },

  desc: {
    fontSize: 14,
    color: "#666",
    textAlign: "justify",
  },

  price: {
    fontSize: 18,
    color: "#FF8C00",
    fontWeight: "bold",
  },

  qtdContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  qtdButton: {
    height: 35,
    width: 35,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },

  qtdButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  qtdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  additionalContainer: {
    marginVertical: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    gap: 5,
  },

  additionalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  additionalText: {
    fontSize: 16,
    color: "#333",
  },

  additionalPrice: {
    fontSize: 16,
    color: "#FF8C00",
    fontWeight: "bold",
  },

  buyButton: {
    backgroundColor: "#FF8C00",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  buyButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});