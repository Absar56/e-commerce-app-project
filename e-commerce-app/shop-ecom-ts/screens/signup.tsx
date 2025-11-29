import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ImageBackground, 
  StyleSheet, KeyboardAvoidingView, Platform, Alert 
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";  
import { imageMap } from "../utils/imagemap";

export default function Signup() {
  const nav = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert("Enter valid email");
    if (password.length < 6) return Alert.alert("Password min 6 chars");
    if (password !== confirm) return Alert.alert("Passwords do not match");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);

      await AsyncStorage.setItem("user_email", email.trim().toLowerCase());
      await AsyncStorage.setItem("userPassword", password);

      setLoading(false);
      Alert.alert("Success", "Account created successfully!");
      nav.replace("main", { screen: "Home" });
    } catch (err: any) {
      setLoading(false);
      Alert.alert("Signup failed", err.message || "Try again");
    }
  };

  return (
    <ImageBackground source={imageMap["background.png"]} style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrap}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <TextInput
              style={styles.inputPass}
              placeholder="Password"
              secureTextEntry={!show}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShow((s) => !s)} style={{ padding: 8 }}>
              <Ionicons name={show ? "eye" : "eye-off"} size={22} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={!show}
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity style={styles.primary} onPress={handle} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? "Creating..." : "Sign up"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => nav.navigate("login" as any)} style={{ marginTop: 10 }}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
  wrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "92%",
    backgroundColor: "rgba(255,255,255,0.96)",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  logo: { width: 90, height: 90, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "700", color: "#007bff", marginBottom: 10 },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    paddingRight: 8,
  },
  inputPass: { flex: 1, padding: 12 },
  primary: {
    width: "100%",
    padding: 14,
    backgroundColor: "#28a745",
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700" },
  link: { color: "#007bff" },
});