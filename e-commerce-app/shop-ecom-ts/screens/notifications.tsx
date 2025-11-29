import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Your order has been shipped!",
      message: "Order #12345 is on the way. Track your order now.",
      icon: "cube-outline",
      time: "2h ago",
      read: false,
    },
    {
      id: "2",
      title: "Wishlist Deal Alert 🔥",
      message: "Your wishlist item ‘Noise Smartwatch’ is now 30% off!",
      icon: "heart-outline",
      time: "5h ago",
      read: false,
    },
    {
      id: "3",
      title: "Payment Successful 💳",
      message: "Your payment of ₹1,299 was successful. Thanks for shopping!",
      icon: "card-outline",
      time: "1d ago",
      read: true,
    },
    {
      id: "4",
      title: "Big Billion Day Offer 🎉",
      message:
        "Exclusive offers are live now! Grab your favourite items quickly.",
      icon: "pricetag-outline",
      time: "2d ago",
      read: true,
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to remove all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Clear", style: "destructive", onPress: () => setNotifications([]) },
      ]
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNotifications([
        {
          id: "1",
          title: "Your order has been shipped!",
          message: "Order #12345 is on the way. Track your order now.",
          icon: "cube-outline",
          time: "2h ago",
          read: false,
        },
        {
          id: "2",
          title: "Wishlist Deal Alert 🔥",
          message: "Your wishlist item ‘Noise Smartwatch’ is now 30% off!",
          icon: "heart-outline",
          time: "5h ago",
          read: false,
        },
        {
          id: "3",
          title: "Payment Successful 💳",
          message: "Your payment of ₹1,299 was successful. Thanks for shopping!",
          icon: "card-outline",
          time: "1d ago",
          read: true,
        },
        {
          id: "4",
          title: "Big Billion Day Offer 🎉",
          message:
            "Exclusive offers are live now! Grab your favourite items quickly.",
          icon: "pricetag-outline",
          time: "2d ago",
          read: true,
        },
      ]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: item.read ? "#f7f7f7" : "#fff" },
      ]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.leftIcon}>
        <Ionicons
          name={item.icon as any}
          size={28}
          color={item.read ? "#777" : "#007AFF"}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {!item.read && (
        <View style={styles.unreadDot}>
          <Ionicons name="ellipse" size={10} color="#007AFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("../assets/images/empty_notification.png")}
          style={styles.emptyImg}
        />
        <Text style={styles.emptyTitle}>No Notifications Yet</Text>
        <Text style={styles.emptyText}>
          You’ll be notified here about offers, orders & updates.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
          >
            <Text style={styles.markAll}>Mark all as read</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={clearAll}>
            <Text style={[styles.markAll, { marginLeft: 12, color: "red" }]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    paddingHorizontal: 10,
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  markAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  leftIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "700", color: "#000" },
  message: { fontSize: 14, color: "#555", marginVertical: 4 },
  time: { fontSize: 12, color: "#999" },
  unreadDot: { marginLeft: 6 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyImg: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  emptyText: { textAlign: "center", color: "#777", fontSize: 14 },
});