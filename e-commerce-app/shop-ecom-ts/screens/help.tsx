import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";

export default function Help() {
  const openEmail = () => {
    Linking.openURL("mailto:support@mykart.com?subject=Support%20Request");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.sectionTitle}>FAQs</Text>
      <View style={styles.card}>
        <Text style={styles.question}>❓ How can I track my order?</Text>
        <Text style={styles.answer}>Go to ‘My Orders’ in your account to view real-time updates on your orders.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>🔄 How do I return a product?</Text>
        <Text style={styles.answer}>You can request a return from the order details page within 7 days of delivery.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>💰 How will I get my refund?</Text>
        <Text style={styles.answer}>Refunds are credited to your original payment method within 5–7 business days.</Text>
      </View>

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>Have an issue? We’re here to help you 24/7.</Text>

      <TouchableOpacity style={styles.button} onPress={openEmail}>
        <Text style={styles.buttonText}>📧 Email Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#007AFF", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 10, borderColor: "#ddd", borderWidth: 1 },
  question: { fontSize: 16, fontWeight: "bold", color: "#007AFF", marginBottom: 5 },
  answer: { fontSize: 14, color: "#555" },
  text: { fontSize: 15, color: "#444", marginBottom: 15 },
  button: { backgroundColor: "#007AFF", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});