import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { imageMap } from "../utils/imagemap";

export default function Forgotpassword() {
  const nav = useNavigation<any>();
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);

  const handle = async () => {
    if(!/\S+@\S+\.\S+/.test(email)) return Alert.alert("Enter valid email");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setLoading(false);
      Alert.alert("Reset link sent. Check email.");
      nav.replace("login");
    } catch(err:any) {
      setLoading(false);
      Alert.alert("Error", err.message || "Try again");
    }
  };

  return (
    <ImageBackground source={imageMap["background.png"]} style={styles.bg}>
      <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <TextInput style={styles.input} placeholder="Your email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TouchableOpacity style={styles.primary} onPress={handle} disabled={loading}><Text style={styles.primaryText}>{loading?"Sending...":"Send reset link"}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>nav.navigate("login" as any)} style={{marginTop:10}}><Text style={styles.link}>Back to Login</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg:{flex:1,resizeMode:"cover"},
  wrap:{flex:1,justifyContent:"center",alignItems:"center"},
  card:{width:"92%",backgroundColor:"rgba(255,255,255,0.96)",padding:18,borderRadius:12,alignItems:"center"},
  title:{fontSize:20,fontWeight:"700",color:"#007bff",marginBottom:10},
  input:{width:"100%",padding:12,borderRadius:10,borderWidth:1,borderColor:"#ddd",marginBottom:12},
  primary:{width:"100%",padding:14,backgroundColor:"#28a745",borderRadius:10,alignItems:"center"},
  primaryText:{color:"#fff",fontWeight:"700"},
  link:{color:"#007bff"}
});