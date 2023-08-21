import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';


const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#120C6E','#5E72EB']}
      style={styles.container}
    >
      <LottieView
        style={styles.image}
        source={require('../assets/animated/segurity.json')} autoPlay styles={styles.animationContainer}
      />
     
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default SplashScreen;