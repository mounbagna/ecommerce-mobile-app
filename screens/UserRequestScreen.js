import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useState,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import jwt_decode from "jwt-decode"
  import { UserType } from "../UserContext";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  
  const AddressScreen = () => {
      const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [pname, setPname] = useState("");
    const {userName,setUserName} = useContext(UserType)
    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const storedUserName = await AsyncStorage.getItem('userName');
          if (storedUserName) {
            setUserName(storedUserName);
          }
        } catch (error) {
          console.error('Failed to fetch user name:', error);
        }
      };
  
      fetchUserName();
    }, []);
    
  useEffect(() => {
    if (userName) {
      fetchAddresses();
    }
  }, [userName]);

    const handleRequest = async () => {
        const request = {
            name,
            email,
            pname,
        };

        
            axios.post("http://10.0.2.2:8000/sendrequest", request)
            .then((response)=>{
                Alert.alert("Success", "request sent successfully");
            setName("");
            setEmail("");
            setPname("");
            

            setTimeout(() => {
                navigation.goBack();
            }, 500);
            }).catch ((error) =>{
                Alert.alert("Error", "Failed to send request");
                
            }) 
    }
    return (
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ height: 50, backgroundColor: "#00CED1" }} />
  
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Customer's Name
          </Text>
  
          <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            placeholder="Enter your name"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Email Adress
            </Text>
  
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="enter your Email's Adress"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Product's Name
            </Text>
  
            <TextInput
              value={pname}
              onChangeText={(text) => setPname(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter the name of the Item"
            />
          </View>
  
          <Pressable
          onPress={handleRequest}
            style={{
              backgroundColor: "#FFC72C",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Send</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default AddressScreen;
  
  const styles = StyleSheet.create({});