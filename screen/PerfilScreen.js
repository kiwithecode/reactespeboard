import * as DocumentPicker from "expo-document-picker";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
import { ApiService } from "../service/service";

const PerfilScreen = ({ route }) => {
  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const username = route.params?.username;

  console.log("Nombre de usuario en PerfilScreen:", username); // <-- Imprime el nombre de usuario

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const data = await ApiService.getPerfil(username);
        setPerfil(data);
      } catch (error) {
        Alert.alert("Error", "Ocurrió un error al obtener el perfil.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerfil();
  }, []);

  const updateSignature = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        await ApiService.updateFirma(username, result.uri);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar la firma.");
      console.log(error); // Para ver detalles del error
    }
  };

  const authenticate = async () => {
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
        "No tienes huella digital o Face ID registrado en este dispositivo."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setModalVisible(true);
    } else {
      Alert.alert("Error", "Fallo en la autenticación.");
    }
  };

  // Si aún se está cargando, muestra un mensaje de carga
  if (loading) {
    return <Text>Cargando perfil...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.field}>{perfil.name}</Text>
      <Text style={styles.field}>{perfil.ID}</Text>
      <Text style={styles.field}>{perfil["FECHA DE NACIMIENTO"]}</Text>
      <Text style={styles.field}>{perfil.email}</Text>

      <Button title="Subir firma (PDF)" onPress={updateSignature} />
      <View style={styles.space} />
      <Button title="Registrar Huella/Face ID" onPress={authenticate} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Datos agregados</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  space: {
    height: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  field: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default PerfilScreen;
