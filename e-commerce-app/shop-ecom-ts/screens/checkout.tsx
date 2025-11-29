import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { imageMap } from "../utils/imagemap";
import * as Linking from "expo-linking";
import { useCart } from "../context/cartContext";
import { auth} from "../firebaseconfig";

export default function Checkout() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { dispatch } = useCart();
  const amount = route.params?.amount ?? 0;
  const UPI_ID = "absarabsar9677@okaxis"; 

  const openUpi = async () => {
    const url = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("Shop")}&am=${amount}&cu=INR`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("No UPI app", "No UPI app found on device. Try manual payment using QR.");
        return;
      }
      await Linking.openURL(url);
      Alert.alert("After paying", "If you completed payment in UPI app, press 'I paid' to confirm.");
    } catch (err:any) {
      Alert.alert("Error", err.message || "Cannot open UPI app");
    }
  };

  const confirmPaid = () => {
    
    Alert.alert("Payment confirmed", "Order placed successfully!");
    dispatch({ type: "CLEAR" });
    nav.replace("main", { screen:"Home" }) ;
  };

  return (
    <View style={{ flex: 1, padding: 26 }}>
      <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 8 }}>Checkout</Text>
      <Text style={{ marginBottom: 12 }}>Amount: ₹ {amount.toFixed(2)}</Text>

      <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 10, alignItems: "center" }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Pay using UPI</Text>
        <Image source={imageMap["upi_qr.png"]} style={{ width: 180, height: 180, marginBottom: 10 }} />
        <Text style={{ marginBottom: 8 }}>{UPI_ID}</Text>

        <TouchableOpacity style={styles.upiBtn} onPress={openUpi}><Text style={styles.upiText}>Open UPI App</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.upiBtn, { backgroundColor: "#28a745", marginTop: 10 }]} onPress={confirmPaid}><Text style={styles.upiText}>I paid (Confirm)</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={{ marginTop: 16 }} onPress={() => nav.goBack()}><Text style={{ color: "#007bff" }}>Back to Cart</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  upiBtn: { backgroundColor: "#ff6a00", padding: 12, borderRadius: 10, width: "80%", alignItems: "center" },
  upiText: { color: "#fff", fontWeight: "700" }
});