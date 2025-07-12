import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { restaurants } from "../restaurants";
import type { Restaurant } from "../types";

export default function Index() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReserve = () => {
    setModalVisible(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Готово!", "Ваш столик забронирован");
    }, 2000);
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setSelectedRestaurant(item);
          setModalVisible(true);
        }}
      >
        <Text>Подробнее</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRestaurant && (
              <>
                <Image
                  source={{ uri: selectedRestaurant.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                <Text style={styles.modalDescription}>
                  Категории: {selectedRestaurant.categories.join(", ")}
                </Text>
                <Pressable style={styles.reserveButton} onPress={handleReserve}>
                  <Text style={styles.reserveText}>Забронировать столик</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  button: {
    backgroundColor: "coral",
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#coral",
    textAlign: "center",
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: "#coral",
    padding: 12,
    borderRadius: 8,
  },
  reserveText: {
    fontSize: 16,
  },
  loadingOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
