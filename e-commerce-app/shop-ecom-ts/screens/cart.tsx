import React, { useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { imageMap } from "../utils/imagemap";
import { useCart } from "../context/cartContext";

export default function Cart() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { state, dispatch, totalPrice } = useCart();

  useEffect(() => {
    if (route.params?.add) {
      dispatch({ type: "ADD", product: route.params.add });
      nav.setParams({ add: undefined });
    }
  }, [route.params]);

  const render = ({ item }: any) => (
    <View style={styles.row}>
      <Image source={imageMap[item.image]} style={styles.img} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "700" }}>{item.name}</Text>
        <Text style={{ color: "#0a7", marginTop: 6 }}>₹ {item.price.toFixed(2)}</Text>

        <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
          <TouchableOpacity style={styles.step} onPress={() => dispatch({ type: "DEC", id: item.id })}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10, fontWeight: "700" }}>{item.qty}</Text>
          <TouchableOpacity style={styles.step} onPress={() => dispatch({ type: "INC", id: item.id })}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontWeight: "800" }}>₹ {(item.qty * item.price).toFixed(2)}</Text>
    </View>
  );

  const items = Object.values(state.items);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {items.length === 0 ? (
        <Text style={{ color: "#666" }}>Cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i: any) => String(i.id)}
            renderItem={render}
            contentContainerStyle={{ paddingBottom: 180 }}
          />

          <View style={styles.summaryBox}>
            <Text style={{ fontWeight: "700" }}>Deliver to</Text>
            <Text style={{ color: "#555", marginTop: 6 }}>Home • 9999999999</Text>
            <Text style={{ color: "#555", marginTop: 4 }}>Your address, city</Text>

            <View style={{ marginTop: 12, borderTopWidth: 1, borderColor: "#eee", paddingTop: 10 }}>
              <View style={styles.rowBetween}>
                <Text>Items ({items.length})</Text>
                <Text>₹ {totalPrice.toFixed(2)}</Text>
              </View>
              <View style={[styles.rowBetween, { marginTop: 6 }]}>
                <Text>Delivery</Text>
                <Text>FREE</Text>
              </View>
              <View style={[styles.rowBetween, { marginTop: 10 }]}>
                <Text style={{ fontWeight: "800" }}>Total</Text>
                <Text style={{ fontWeight: "800" }}>₹ {totalPrice.toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                style={styles.payBtn}
                onPress={() => nav.navigate("checkout", { amount: totalPrice, items })}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Proceed to Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f7f8fb",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  img: { width: 72, height: 72, resizeMode: "contain" },
  step: {
    width: 30,
    height: 30,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  summaryBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    margin: 12, 
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  payBtn: {
    marginTop: 14,
    backgroundColor: "#ff6a00",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});