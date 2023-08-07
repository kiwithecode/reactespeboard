import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';

const HomeScreen = () => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);

  const handleRegister = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Tu dispositivo no soporta autenticación biométrica.');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No tienes configurada la autenticación biométrica en tu dispositivo.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      Alert.alert('Exito', 'Registrado con éxito.');
    } else {
      Alert.alert('Error', 'No se pudo autenticar.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5E72EB','#5E72EB', '#FF9190']}
        style={styles.banner}
      >
        <Text style={styles.welcomeText}>Bienvenido Usuario 🪐🚀</Text>
        <View style={styles.profileIconContainer}>
          <Image
            style={styles.profileIcon}
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}}
          />
        </View>
      </LinearGradient>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Text style={styles.subjectTitle}>Materias del día 🌎</Text>
      <ScrollView horizontal={true} style={styles.carouselContainer} contentContainerStyle={styles.carouselContentContainer}>
        <LinearGradient colors={['#120C6E', '#5E72EB']} style={styles.carouselItem}>
          <Text style={styles.subjectText}>Arquitectura de software</Text>
          <Text style={styles.timeText}>7 am a 9 am</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={['#5E72EB', '#ff9190']} style={styles.carouselItem} >
        <Text style={styles.subjectText}>Construccion y Evolucion</Text>
          <Text style={styles.timeText}>9 am a 11 am</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>
          </LinearGradient>
        <LinearGradient colors={['#ff9190', '#fdc094']} style={styles.carouselItem} >
        <Text style={styles.subjectText}>Gestion de proyectos</Text>
          <Text style={styles.timeText}>11 am a 12 am</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>
          </LinearGradient>
        <LinearGradient colors={['#fdc094', '#120C6E']} style={styles.carouselItem} >
        <Text style={styles.subjectText}>Seguridad</Text>
          <Text style={styles.timeText}>13:30 pm a 15:30 pm</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>
          </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  profileIconContainer: {
    position: 'absolute',
    bottom: 10, 
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#5E72EB',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  dateText: {
    fontSize: 30,
    color: '#120C6E',
    marginTop: 30,
    fontWeight: 'bold',
  },
  subjectTitle: {
    fontSize: 35,
    color: '#120C6E',
    marginTop: 20,
    fontWeight: 'bold',
  },
  carouselContainer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  carouselContentContainer: {
    justifyContent: 'center',
  },
  carouselItem: {
    width: 380,
    height: 300,
    borderRadius: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 10,
  },
  registerText: {
    fontSize: 25,
    color: '#ffffff',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
