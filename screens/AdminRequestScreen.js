import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Dimensions,
    Image,
}from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: viewportWidth } = Dimensions.get('window');

  const AdminHomeScreen = () =>{
    const list = [
      {
        id: "0",
        image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
        name: "Home",
      },
      {
        id: "1",
        image:
          "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
        name: "Deals",
      },
      {
        id: "3",
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
        name: "Electronics",
      },
      {
        id: "4",
        image:
          "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
        name: "Mobiles",
      },
      {
        id: "5",
        image:
          "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
        name: "Music",
      },
      {
        id: "6",
        image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
        name: "Fashion",
      },
    ];


  const [requests, setRequests] = useState([]); 

  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/requests");
        setRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const deleteRequest = async (requestId) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/deleterequest/${requestId}`);
      // Remove the deleted user from the users state
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

    return (
      <>
      <SafeAreaView
      style={{
        padding: Platform.OS == "android"?40:0,
        flex:1,
        backgroundColor:"white",
      }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              
              <TextInput placeholder="Search..." />
            </Pressable>
            </View>

            <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Pressable>
            
                <Text style={{fontSize:13,fontWeight:"500"}}>
                  REQUEST PAGE
                </Text>
            </Pressable>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>


<Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}></Text>
{/* Render users */}
    <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          List Of Requests
        </Text>
        {requests && requests.map((request) => (
  <View key={request.id} style={{ padding: 10 }}>
    <Text>User Name: {request.name}</Text>
    <Text>Email: {request.email}</Text>
    <Text>Item: {request.pname}</Text>
    {/* You can display other user information here */}
    <Pressable onPress={() => deleteRequest(request._id)}>
      <Text style={{ color: "red" }}>Delete</Text>
    </Pressable>
  </View>
))}

          
        </ScrollView>
      </SafeAreaView>
      </>
    )
  }

  export default AdminHomeScreen;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: viewportWidth,
  },
  image: {
    width: viewportWidth,
    height: 200,
    resizeMode: 'cover',
  },
});
  