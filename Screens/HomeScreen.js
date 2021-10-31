import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
  Animated,
} from "react-native";
import Axios from "../Components/Axios";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    await Axios.get("/places")
      .then((res) => {
        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  useEffect(() => {
    getPlaces();
  }, [places]);
  return (
    <>
      <StatusBar style="auto" />
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", height }}
        >
          <ActivityIndicator size="large" color="#107db0" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Animated.FlatList
            data={places}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
              });
              const textOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 0, 50],
              });
              return (
                <View style={styles.coverImgContainer}>
                  <Animated.Image
                    source={{ uri: item.coverImg }}
                    style={[
                      {
                        width,
                        height,
                        resizeMode: "cover",
                        opacity,
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.textContainer,
                      { opacity: textOpacity, transform: [{ translateY }] },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        navigation.navigate("Place Details", { item });
                      }}
                    >
                      <Text style={styles.textHeading}>{item.name}</Text>
                      <Text numberOfLines={3} style={styles.textContent}>
                        {item.content}
                      </Text>
                      <Text
                        style={{
                          color: "#03a1fc",
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Read More...
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  coverImgContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    bottom: 80,
    width: width * 0.95,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
  },
  textHeading: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
    opacity: 0.9,
    marginBottom: 10,
  },
  textContent: {
    color: "#555",
    opacity: 0.7,
    letterSpacing: 1,
    fontSize: 13,
    textAlign: "justify",
  },
});
