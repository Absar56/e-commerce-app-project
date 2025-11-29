import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Forgotpassword from "./screens/forgotpassword";
import Home from "./screens/home";
import Product from "./screens/product";
import Cart from "./screens/cart";
import Checkout from "./screens/checkout";
import Account from "./screens/account";
import EditProfile from "./screens/editProfile";
import MyOrders from "./screens/myOrders";
import Wishlist from "./screens/wishlist";
import Notifications from "./screens/notifications";
import Help from "./screens/help";
import ChangePassword from "./screens/ChangePassword";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Account") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="forgotpassword" component={Forgotpassword} />
            <Stack.Screen name="main" component={MainTabs} />
            <Stack.Screen name="product" component={Product} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="help" component={Help} />
            <Stack.Screen name="editProfile" component={EditProfile} />
            <Stack.Screen name="wishlist" component={Wishlist} />
            <Stack.Screen name="notifications" component={Notifications} />
            <Stack.Screen name="myOrders" component={MyOrders} />
            <Stack.Screen name="changePassword" component={ChangePassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
}