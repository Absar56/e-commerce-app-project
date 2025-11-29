import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageMap } from "../utils/imagemap";

export default function Login() {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Alert.alert("Enter valid email");
    }
    if (password.length < 6) {
      return Alert.alert("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      await AsyncStorage.setItem("user_email", email.trim().toLowerCase());

      setLoading(false);
      Alert.alert("Success", "Login successful!");
      nav.replace("main", { screen: "Home" });
    } catch (err: any) {
      setLoading(false);
      if (err.code === "auth/invalid-credential") {
        Alert.alert("Invalid credentials", "Email or password is incorrect.");
      } else {
        Alert.alert("Login failed", err.message || "Try again later.");
      }
    }
  };

  return (
    <ImageBackground source={imageMap["background.png"]} style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrap}
      >
        <View style={styles.card}>
          <Text style={styles.title}>ShopEasy 🛍</Text>

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
            <TouchableOpacity onPress={() => setShow(!show)} style={{ padding: 8 }}>
              <Ionicons name={show ? "eye" : "eye-off"} size={22} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primary}
            onPress={login}
            disabled={loading}
          >
            <Text style={styles.primaryText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 12, alignItems: "center" }}>
            <TouchableOpacity onPress={() => nav.navigate("signup" as any)}>
              <Text style={styles.link}>Create account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => nav.navigate("forgotpassword" as any)}
            >
              <Text style={[styles.link, { marginTop: 8 }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#ff6a00",
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700" },
  link: { color: "#007bff" },
});