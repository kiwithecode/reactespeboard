import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("es-ES", options);

  // Estado para los Items
  const [registeredSubjects, setRegisteredSubjects] = React.useState([]);

  const subjects = [
    { name: "Arquitectura de software", time: "7 am a 9 am", colors: ["#120C6E", "#5E72EB"] },
    { name: "Construccion y Evolucion", time: "9 am a 11 am", colors: ["#5E72EB", "#ff9190"] },
    { name: "Gestion de proyectos", time: "11 am a 12 am", colors: ["#ff9190", "#fdc094"] },
    { name: "Seguridad", time: "13:30 pm a 15:30 pm", colors: ["#fdc094", "#120C6E"] },
  ];

  const handleRegister = async (subjectName) => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        "Error",
        "Tu dispositivo no soporta autenticación biométrica."
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert(
        "Error",
        "No tienes configurada la autenticación biométrica en tu dispositivo."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      Alert.alert("Exito", "Registrado con éxito.");
      setRegisteredSubjects([...registeredSubjects, subjectName]);
    } else {
      Alert.alert("Error", "No se pudo autenticar.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#5E72EB", "#5E72EB", "#FF9190"]}
        style={styles.banner}
      >
        <Text style={styles.welcomeText}>Bienvenido Usuario 🪐🚀</Text>
        <View style={styles.profileIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.profileIcon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Text style={styles.subjectTitle}>Materias del día 🌎</Text>
      <ScrollView
        horizontal={true}
        style={styles.carouselContainer}
        contentContainerStyle={styles.carouselContentContainer}
      >
        {subjects
          .filter((subject) => !registeredSubjects.includes(subject.name))
          .map((subject) => (
            <LinearGradient
              key={subject.name}
              colors={subject.colors}
              style={styles.carouselItem}
            >
              <Text style={styles.subjectText}>{subject.name}</Text>
              <Text style={styles.timeText}>{subject.time}</Text>
              <TouchableOpacity onPress={() => handleRegister(subject.name)}>
                <Text style={styles.registerText}>Registrar</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        {registeredSubjects.length === subjects.length && (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>Buen Trabajo!! 👍 👍</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  profileIconContainer: {
    position: "absolute",
    bottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#5E72EB",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  dateText: {
    fontSize: 30,
    color: "#120C6E",
    marginTop: 30,
    fontWeight: "bold",
  },
  subjectTitle: {
    fontSize: 35,
    color: "#120C6E",
    marginTop: 20,
    fontWeight: "bold",
  },
  carouselContainer: {
    flexDirection: "row",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  carouselContentContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5.46,
  },
  carouselItem: {
    width: 320,
    height: 250,
    borderRadius: 30,
    marginRight: 60,
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  subjectText: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 10,
  },
  registerText: {
    fontSize: 25,
    color: "#FFFFFF",
    marginTop: 20,
    fontWeight: "bold",
  },
  completedContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    height: 300,
    borderRadius: 40,
    marginRight: 40,
    backgroundColor: "transparent",
    
  },
  completedText: {
    fontSize: 30,
    color: "#120C6E",
    fontWeight: "bold",
  },
});

export default HomeScreen;
