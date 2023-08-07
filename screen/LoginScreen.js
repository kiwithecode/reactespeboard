import React, { useState } from "react";
import { Button, TextInput, View, Alert, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onLogin = () => {
    if (username === "Admin" && password === "admin") {
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <LinearGradient colors={['#120C6E','#5E72EB','#ffffff' ,'#ffffff','#ffffff','#ffffff','#ffffff']} style={styles.container}>
      <Image source={require('../assets/logoQ.png')} style={styles.logo} />
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
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIcon}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={24} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onLogin} title="Login" color="#5e72eb" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b0742',
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    color: '#0b0742',
    marginBottom: 20,
  },
  inputPassword: {
    fontSize: 18,
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    color: '#0b0742',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  eyeIcon: {
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;