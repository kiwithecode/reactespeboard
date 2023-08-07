import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);

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
        <LinearGradient colors={['#120C6E', '#5E72EB']} style={styles.carouselItem} />
        <LinearGradient colors={['#5E72EB', '#ff9190']} style={styles.carouselItem} />
        <LinearGradient colors={['#ff9190', '#fdc094']} style={styles.carouselItem} />
        <LinearGradient colors={['#fdc094', '#120C6E']} style={styles.carouselItem} />
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
  },
});

export default HomeScreen;
