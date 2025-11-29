import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWishlist } from "../context/wishlistContext";
import { imageMap } from "../utils/imagemap";
import { Ionicons } from "@expo/vector-icons";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigation = useNavigation<any>();

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>

          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => navigation.navigate("main", { screen: "Home" })}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
          <Image source={imageMap[item.image]} style={styles.img} />

            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() =>
                    navigation.navigate("product", {
                      product: { ...item, image: item.image },
                    })
                  }
                >
                  <Text style={styles.cartText}>View Product</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: StatusBar.currentHeight || 10, 
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
  },
  shopNowButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  img: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  details: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  price: {
    color: "#0a7",
    fontWeight: "bold",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartBtn: {
    backgroundColor: "#ff6a00",
    padding: 8,
    borderRadius: 6,
  },
  cartText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});