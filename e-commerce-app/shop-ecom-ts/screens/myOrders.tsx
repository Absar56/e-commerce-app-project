import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const orders = [
  {
    id: "1",
    name: "Wireless Mouse",
    price: "₹799",
    status: "Delivered",
    date: "Oct 5, 2025",
    image: require("../assets/images/wireless_mouse.jpg"),
  },
  {
    id: "2",
    name: "Bluetooth Headphones",
    price: "₹1,999",
    status: "Out for Delivery",
    date: "Oct 8, 2025",
    image: require("../assets/images/bluetooth_headphones.jpg"),
  },
  {
    id: "3",
    name: "Apple Smart Watch",
    price: "₹2,999",
    status: "Cancelled",
    date: "Oct 2, 2025",
    image: require("../assets/images/apple_smartwatch.jpg"),
  },
];

export default function MyOrders({ navigation }) {
  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={[styles.status, 
          item.status === "Delivered"
            ? { color: "green" }
            : item.status === "Cancelled"
            ? { color: "red" }
            : { color: "#007AFF" },
        ]}>
          {item.status}
        </Text>
        <Text style={styles.date}>Ordered on {item.date}</Text>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => alert("Tracking order for " + item.name)}
        >
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 15,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#444",
  },
  status: {
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  trackButton: {
    backgroundColor: "#007AFF",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  trackText: {
    color: "#fff",
    fontWeight: "bold",
  },
});