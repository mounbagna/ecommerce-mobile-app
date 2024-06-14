import React, { useState } from 'react';
import {
    Image, 
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        // Send a POST request to the backend API to register the user
        axios
            .post("http://10.0.2.2:8000/register", user)
            .then((response) => {
                console.log(response.data);
                Alert.alert(
                    "Registration Successful",
                    response.data.message
                );
                setName("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    error.response.data.message || "An error occurred while registering"
                );
                console.log("Registration failed", error);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
            <Image
      style={{width:420,height:100}}
      source={require('../assets/ecom.jpg')}
      />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>
                        Register An Account
                    </Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                            placeholder="Enter your name"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                            placeholder="Enter your email"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Enter your password"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot Password</Text>
                </View>
                <View style={{ marginTop: 80 }} />
                <Pressable onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#D0D0D0",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    input: {
        color: "gray",
        marginVertical: 10,
        width: 300,
        fontSize: 16,
    },
    registerButton: {
        width: 200,
        backgroundColor: "#FEBE10",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 15,
    },
    registerButtonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RegisterScreen;
