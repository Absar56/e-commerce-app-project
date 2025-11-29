import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from "react-native";
import products from "../products";
import { imageMap } from "../utils/imagemap";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const nav = useNavigation<any>();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const render = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flexDirection: "row", flex: 1 }}
        onPress={() => nav.navigate("product", { product: item })}
      >
        <Image source={imageMap[item.image]} style={styles.img} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.CartBtn}
        onPress={() => nav.navigate("Cart", { add: item })}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>🛒</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {}
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="888"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.header}>Best Deals</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={p => String(p.id)}
        renderItem={render}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fb",
    paddingTop: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color:"#000",
  },
  header: { fontSize: 22, fontWeight: "800", paddingHorizontal: 12, marginBottom: 8 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  img: { width: 88, height: 88, resizeMode: "contain", marginTop: 4 },
  name: { fontWeight: "700" },
  desc: { color: "#555", marginTop: 6 },
  price: { color: "#009688", fontWeight: "800", marginTop: 6 },
  CartBtn: {
    backgroundColor: "#03b6fd04",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});