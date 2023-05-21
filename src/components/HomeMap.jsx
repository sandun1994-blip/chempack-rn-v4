import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import React from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import cars from "../../assets/data/cars";
// import Geolocation from "@react-native-community/geolocation";


export default function HomeMap() {

  // Geolocation.watchPosition(
  //   position => {
  //     const {latitude, longitude} = position.coords;
  //     console.log(latitude);
  //   },
  //   error => {
  //     console.log(error);
  //   },
  //   {
  //     enableHighAccuracy: true,
  //     distanceFilter: 100,
  //     timeout: 15000,
      
  //   },
  // );
    
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#a0abff",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: 28.450627,
          longitude: -16.263045,
          latitudeDelta: 0.0292,
          longitudeDelta: 0.0121,
        }}>
        {cars.map(item => (
          <Marker
            key={item.id}
            draggable
            coordinate={{latitude: item.latitude, longitude: item.longitude}}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 70,
                width: 70,
                resizeMode: 'cover',
                transform: [
                  {
                    rotate: `${item.heading}deg`,
                  },
                ],
              }}
              source={require("../../assets/images/top-UberX.png")}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
