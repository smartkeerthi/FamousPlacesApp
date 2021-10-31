import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("screen");

const PlaceDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const images = item.images.split(", ");
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 30, left: 10, zIndex: 2 }}
      >
        <MaterialIcons name="arrow-back" size={24} color="#eee" />
      </TouchableOpacity>
      {/* <SharedElement id={`item.${item._id}.image`}> */}
      <Image
        source={{ uri: item.coverImg }}
        style={[StyleSheet.absoluteFillObject, { height: height / 2 }]}
      />
      {/* </SharedElement> */}
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: height / 2 - 100,
        }}
      >
        <View style={styles.bottomSheet}>
          {/* <SharedElement id={`item.${item._id}.text`}> */}
          <Text style={styles.title}>{item.name}</Text>
          {/* </SharedElement> */}
          <FlatList
            data={images}
            keyExtractor={(_, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 350,
                    height: 250,
                    resizeMode: "cover",
                    marginHorizontal: 10,
                    marginBottom: 20,
                  }}
                />
              );
            }}
          />
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.subtitle}> Location </Text>
          <Text style={{ letterSpacing: 1, fontSize: 16, marginBottom: 20 }}>
            {" "}
            {item.location}{" "}
          </Text>
          <Text> Map View </Text>
          <MapView
            style={{ width: width * 0.93, height: height / 2 }}
            region={{
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            mapType={"hybrid"}
            provider="google"
          >
            <Marker
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              title={item.name}
            />
            <Circle
              center={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              radius={1000}
              strokeWidth={1}
              strokeColor={"rgba(107, 230, 255, 0.8)"}
              fillColor={"rgba(107, 230, 255, 0.3)"}
            />
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
};

// PlaceDetailsScreen.sharedElements = (route, otherRoute, showing) => {
//   const { item } = route.params;
//   return [
//     // { id: `item.${item._id}.image`, animation: "fade" },
//     { id: `item.${item._id}.text` },
//   ];
// };

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  bottomSheet: {
    width,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    letterSpacing: 1.5,
    lineHeight: 25,
    textAlign: "justify",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
