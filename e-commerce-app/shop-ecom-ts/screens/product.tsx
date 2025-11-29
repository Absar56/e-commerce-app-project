import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { imageMap } from "../utils/imagemap";
import { useWishlist } from "../context/wishlistContext";

export default function Product() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const product = route.params?.product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#333");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message: string, color: string) => {
    setToastMessage(message);
    setToastColor(color);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          setToastMessage("");
        });
      }, 1100);
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from Wishlist", "#d9534f");
    } else {
      addToWishlist(product);
      showToast("Added to Wishlist", "#28a745");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageMap[product.image]} style={styles.img} />
        <TouchableOpacity style={styles.heartIcon} onPress={handleWishlistToggle}>
          <Ionicons
            name={inWishlist ? "heart" : "heart-outline"}
            size={28}
            color={inWishlist ? "red" : "#777"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("main", {
            screen: "Cart",
            params: { add: product },
          })
        }
      >
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>

      {toastMessage !== "" && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toastContainer,
            { opacity: fadeAnim, backgroundColor: toastColor },
          ]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: "#f7f8fb" },

  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 30,
  },

  img: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
    borderRadius: 10,
  },

  heartIcon: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 4,
  },

  name: { fontSize: 20, fontWeight: "800", marginTop: 16 },
  price: { color: "#0a7", fontWeight: "800", marginTop: 8 },
  desc: { marginTop: 10, color: "#555", lineHeight: 20 },

  btn: {
    backgroundColor: "#ff6a00",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },

  toastContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    minWidth: 200,
    maxWidth: "85%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});