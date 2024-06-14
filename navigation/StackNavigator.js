import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import UserRequestScreen from "../screens/UserRequestScreen";
import AdminRequestScreen from "../screens/AdminRequestScreen";

const StackNavigator = () => {
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "black" }}
              />
            ),
        }}
      />

<Tab.Screen
        name="Request"
        component={UserRequestScreen}
        options={{
          tabBarLabel: "Request",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "black" }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008E97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/profile.jpg")}
                style={{ width: 14, height: 14, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/profile.jpg")}
                style={{ width: 14, height: 14, tintColor: "black" }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/cart.jpg")}
                style={{ width: 24, height: 24, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/cart.jpg")}
                style={{ width: 24, height: 24, tintColor: "black" }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const AdminBottomTabs = () => {
  return (
    <Tab.Navigator>
      
<Tab.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{
          tabBarLabel: "AdminHome",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "black" }}
              />
            ),
        }}
      />

<Tab.Screen
        name="Requests"
        component={AdminRequestScreen}
        options={{
          tabBarLabel: "Requests",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 24, height: 24, tintColor: "black" }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008E97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/profile.jpg")}
                style={{ width: 14, height: 14, tintColor: "#008E97" }}
              />
            ) : (
              <Image
                source={require("../assets/profile.jpg")}
                style={{ width: 14, height: 14, tintColor: "black" }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="AdminMain"
          component={AdminBottomTabs}
          options={{ headerShown: false }}
        />
        
        
        
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
