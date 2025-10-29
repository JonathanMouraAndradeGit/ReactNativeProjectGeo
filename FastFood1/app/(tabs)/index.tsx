import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function MainPage() {
  const categories = [
    { title: "Burgers", img: require("@/assets/imgFood/burg2.png") },
    { title: "Pizza", img: require("@/assets/imgFood/burg2.png") },
    { title: "Pasta", img: require("@/assets/imgFood/burg2.png") },
    { title: "Drinks", img: require("@/assets/imgFood/burg2.png") },
  ];

  const popular = [...Array(5).keys()];
  const recommended = [...Array(4).keys()];
  const newItems = [...Array(6).keys()];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search for food..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={require("@/assets/icons/search1.png")}
              style={styles.iconImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.featured}>
          <Image
            source={require("@/assets/imgFood/burg.jpg")}
            style={styles.featuredBg}
          />
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Special Offer</Text>
            <Text style={styles.featuredDesc}>
              Enjoy 30% off on all Burgers this week only!
            </Text>
            <TouchableOpacity style={styles.featuredBtn}>
              <Text style={styles.featuredBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("@/assets/icons/burger.png")}
            style={styles.featuredImg}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {categories.map((el, i) => (
            <View style={styles.categoryCard} key={i}>
              <Image source={el.img} style={styles.categoryImg} />
              <Text style={styles.categoryText}>{el.title}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {popular.map((_, i) => (
            <View style={styles.foodCard} key={`pop-${i}`}>
              <Image
                source={require("@/assets/imgFood/burg2.png")}
                style={styles.foodImg}
              />
              <View style={styles.foodInfo}>
                <Text style={styles.foodTitle}>Burger {i + 1}</Text>
                <Text style={styles.foodDesc}>Delicious beef & cheese</Text>
                <View style={styles.starRow}>
                  <Image
                    source={require("@/assets/icons/star.png")}
                    style={styles.starIcon}
                  />
                  <Text>4.{i}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recommended</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {recommended.map((_, i) => (
            <View style={styles.recommendCard} key={`rec-${i}`}>
              <Image
                source={require("@/assets/imgFood/burg2.png")}
                style={styles.recommendImg}
              />
              <Text style={styles.recommendTitle}>Meal {i + 1}</Text>
              <Text style={styles.recommendPrice}>R$ {(30 + i * 5).toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <View style={styles.gridContainer}>
          {newItems.map((_, i) => (
            <View style={styles.gridItem} key={`new-${i}`}>
              <Image
                source={require("@/assets/imgFood/burg2.png")}
                style={styles.gridImg}
              />
              <Text style={styles.gridText}>New Dish {i + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ---Layout base
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // ---Header
  header: {
    backgroundColor: "#1e1e1e",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    elevation: 5,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchIcon: {
    backgroundColor: "#FF8C00",
    height: 45,
    width: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  iconImg: {
    height: 24,
    width: 24,
    tintColor: "#fff",
  },

  // ---Featured Banner
  featured: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    height: 180,
    position: "relative",
    elevation: 3,
  },
  featuredBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  featuredContent: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    width: "60%",
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredDesc: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
  },
  featuredBtn: {
    backgroundColor: "#FF8C00",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  featuredBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  featuredImg: {
    position: "absolute",
    right: 10,
    bottom: 0,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  // ---Seções
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 15,
    color: "#333",
    textTransform: "uppercase",
  },
  horizontalList: {
    paddingHorizontal: 15,
    gap: 15,
    paddingVertical: 10,
  },

  // ---Categorias
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 100,
    elevation: 3,
  },
  categoryImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  categoryText: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  // ---Popular
  foodCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 180,
    elevation: 3,
    overflow: "hidden",
  },
  foodImg: {
    width: "100%",
    height: 110,
  },
  foodInfo: {
    padding: 10,
  },
  foodTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  foodDesc: {
    color: "#777",
    fontSize: 13,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },

  // ---Recommended
  recommendCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 150,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  recommendImg: {
    width: 100,
    height: 100,
  },
  recommendTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  recommendPrice: {
    color: "#FF8C00",
    fontWeight: "bold",
    fontSize: 14,
  },

  // ---Grid – New Arrivals
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  gridItem: {
    backgroundColor: "#fff",
    width: "45%",
    marginBottom: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    padding: 10,
  },
  gridImg: {
    width: 100,
    height: 100,
  },
  gridText: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
});