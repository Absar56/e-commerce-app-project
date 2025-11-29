import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-8SV0t3S1BH96so4id4NjVnmB3edWNNI",
  authDomain: "e-commerce-app-b22b1.firebaseapp.com",
  projectId: "e-commerce-app-b22b1",
  storageBucket: "e-commerce-app-b22b1.firebasestorage.app",
  messagingSenderId: "644784010455",
  appId: "1:644784010455:web:bed540587f19353eaa2c92",
  measurementId: "G-8W5H4XHVNV",
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };