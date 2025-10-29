import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FoodList() {
  const [page, setPage] = useState(0);
  const [objFood, setObjFood] = useState([]);
  const [selectFood, setselectObjFood] = useState({
    id: 0, name: "", description: "",
    price: 0, avgQtd: [], img: require('@/assets/imgFood/burg2.png')
  });

  const imageMap: Record<string, any> = {
    'foto1': require('@/assets/imgFood/burg2.png'),
    'foto2': require('@/assets/imgFood/burg2.png'),
    'foto3': require('@/assets/imgFood/burg2.png'),
  };
  const icons = [
    require("@/assets/icons/bell.png"),
    require("@/assets/icons/cart.png"),
    require("@/assets/icons/search1.png"),
    require("@/assets/icons/bell.png"),
  ];

  function togglePage(page: any) {
    //setPage(!page);
    setPage(page);
  }
  function togglePage2(obj: any) {
    setselectObjFood(obj)
    //setPage(!page);
    setPage(1);
  }
  useEffect(() => {
    let searchRes = async () => {
      let res = await getFood()
      setObjFood(res)
    }
    searchRes()
  }, [])
  async function getFood() {
    let result = await fetch("http://localhost:3000/lanches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((el) => el.json())
    result = result.map((el: any) => {
      el.img = imageMap[el.img] || null
      //el = {...el,['img']:require(el.img)}//.img = require(el.img)
      return el
    })
    console.log(result)
    return result
  }
  function calcGrade(arrG: any[]) {
    let gdMax = 0
    arrG.forEach((el) => {
      gdMax += el.grade
    })
    return Math.ceil((gdMax / arrG.length) / 2)
  }
  const [evaluation, setEvaluation] = useState({ desc: "", grade: 0 })
  function setFieldEvaluation(fieldName: any, fielvValue: any) {
    let ev: any = { ...evaluation }
    ev[fieldName] = fielvValue
    setEvaluation({ ...ev })
  }
  async function insertEvaluation() {
    console.log(evaluation);

    // Cria uma cópia imutável do objeto "evaluation"
    let numb = parseInt(String(evaluation["grade"]))
    const avg = { ...evaluation, grade: numb };

    // Clona o selectFood para evitar mutação direta de estado
    const sf = { ...selectFood, avgQtd: [...(selectFood.avgQtd || []), avg] };
    const {img,...obj} = sf
    console.log(sf)
    try {
      const response = await fetch(`http://localhost:3000/lanches/${selectFood.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar: ${response.status}`);
      }

      // Atualiza a página (ou estado)
      await reLoadData()
      setPage(0);
    } catch (error) {
      console.error("Erro ao inserir avaliação:", error);
    }
  }
  async function reLoadData(){
      let res = await getFood()
      setObjFood(res)
  }
  function buyStep1(obj:any){
    addToCart(obj)
    togglePage(0)
  }
  function addToCart(obj:any){
    let mi = localStorage.getItem("myItems")
    if(mi){
      let res = JSON.parse(mi)
      res.push(obj)
      localStorage.setItem("myItems",JSON.stringify(res))
    }else{
      localStorage.setItem("myItems",JSON.stringify([obj]))
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContent}>
        <View style={styles.topSection}>
          <TextInput
            style={styles.input}
            placeholder="Search food..."
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.iconRow}>
          {icons.map((img, i) => (
            <TouchableOpacity key={i} style={styles.iconContainer}>
              <Image style={styles.icon} source={img} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {
        page == 0 ? <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {objFood.map((el: any, i) => (
            <View key={i} style={styles.itemCard}>
              <Image
                source={require("@/assets/imgFood/burg2.png")}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{el.name}</Text>
                <Text style={styles.itemDesc}>
                  {el.description}
                </Text>
                <Text style={styles.itemPrice}>{`R$${el.price}`}</Text>

                <TouchableOpacity style={styles.selectButton} onPress={() => togglePage2(el)}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>

                <View style={styles.starRow}>
                  {[...Array(calcGrade(el.avgQtd)).keys()].map((_, s) => (
                    <Image
                      key={s}
                      source={require("@/assets/icons/star.png")}
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

          : page == 1 ? <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.detailContainer}>
              <View style={styles.detailCard}>
                <Image
                  style={styles.detailImage}
                  source={require("@/assets/imgFood/burg2.png")}
                />
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>{selectFood.name}</Text>
                  <Text style={styles.detailDesc}>
                    {selectFood.description}
                  </Text>
                  <Text style={styles.detailPrice}>{`R$ ${selectFood.price}`}</Text>

                  <TouchableOpacity style={styles.buyButton} 
                  onPress={() => buyStep1({idFood:selectFood.id,desc:selectFood.description,
                  price:selectFood.price,name:selectFood.name,img:selectFood.img})}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.additionalContainer}>
                {[...Array(3).keys()].map((_, i) => (
                  <View style={styles.additionalItem} key={i}>
                    <Text style={styles.additionalText}>Combo {i + 1}</Text>
                    <Text style={styles.additionalPrice}>+ R$ 10,00</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{`R$ ${selectFood.price + 30}`}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Comments</Text>
                <TouchableOpacity style={styles.buyButton} onPress={() => togglePage(2)}>
                  <Text style={styles.buyButtonText}>Comment</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                {
                  selectFood.avgQtd.map((el: any, i) => (
                    <View key={i + "comment"} style={styles.itemCard}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemDesc}>
                          {el.desc}
                        </Text>
                        <View style={styles.starRow}>
                          {[...Array(Math.ceil(el.grade / 2)).keys()].map((_, s) => (
                            <Image
                              key={s}
                              source={require("@/assets/icons/star.png")}
                              style={styles.starIcon}
                            />
                          ))}
                        </View>
                      </View>
                    </View>
                  ))
                }
              </ScrollView>
            </View>
          </ScrollView>

            : <View style={styles.itemCard}>
              <Image
                source={selectFood.img}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <TextInput
                  style={styles.input2}
                  placeholder="description..."
                  placeholderTextColor="#ff9900ff"
                  onChangeText={(e) => setFieldEvaluation("desc", e)}
                  
                />
                <TextInput
                  style={styles.input2}
                  placeholder="grade..."
                  placeholderTextColor="#ff9900ff"
                  keyboardType="numeric"
                  onChangeText={(e) => setFieldEvaluation("grade", e)}
                />

                <TouchableOpacity style={styles.selectButton} onPress={() => insertEvaluation()}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // Header
  topContent: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  input2: {
    width: "100%",
    backgroundColor: "#d3d3d3ff",
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#ffffffff",
    margin: 5
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "white",
  },

  // List view
  scrollContainer: {
    padding: 10,
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  itemImage: {
    width: 140,
    height: 140,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  itemDesc: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 18,
    color: "#FF8C00",
    fontWeight: "bold",
  },
  selectButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 5,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  starRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },

  // Detail view
  detailContainer: {
    flex: 1,
    padding: 15,
    gap: 15,
  },
  detailCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
  },
  detailImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  detailInfo: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-around",
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  detailDesc: {
    color: "#777",
    fontSize: 14,
  },
  detailPrice: {
    color: "#FF8C00",
    fontSize: 22,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // Additional items & total
  additionalContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    gap: 5,
  },
  additionalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C00",
  },
});