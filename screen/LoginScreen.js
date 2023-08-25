import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ApiService } from '../service/service';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onLogin = async () => {
    try {
      const response = await ApiService.login(username, password);
      if (response.message === "Login successful") {
        navigation.navigate("Home", { username: response.user });
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in.");
    }
  };
  

  return (
    <LinearGradient
      colors={[
        "#120C6E",
        "#5E72EB",
        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#ffffff",
      ]}
      style={styles.container}
    >
      <LottieView
        source={require("../assets/animated/segurity.json")}
        autoPlay loop
        style={styles.animationContainer}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={hidePassword}
          style={styles.inputPassword}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  animationContainer: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 50,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0b0742",
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    color: "#0b0742",
    marginBottom: 20,
    borderRadius: 10, // Added this line
  },
  inputPassword: {
    fontSize: 18,
    flex: 1,
    height: 50,
    color: "#0b0742",
    borderRadius: 10, // Added this line
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 50,
    borderRadius: 10, // Added this line
  },
  eyeIcon: {
    padding: 10,
  },

  customButton: {
    backgroundColor: "#5e72eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Esto dará el borde redondeado
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default LoginScreen;
