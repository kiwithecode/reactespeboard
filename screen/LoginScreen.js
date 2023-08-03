import React, { useState } from "react";
import { Button, TextInput, View, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Home"); // Navega a la pantalla de inicio si las credenciales son correctas
    } else {
      Alert.alert("Error", "Credenciales incorrectas"); // Muestra un mensaje de error si las credenciales son incorrectas
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={"Username"}
        style={{ width: "100%", borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={{ marginTop: 20, width: "100%", borderColor: "gray", borderWidth: 1 }}
      />
      <Button onPress={onLogin} title="Login" style={{ marginTop: 20 }}/>
    </View>
  );
}

export default LoginScreen;

