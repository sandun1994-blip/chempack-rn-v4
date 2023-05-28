import {View, Text, StyleSheet, Image, Alert, PermissionsAndroid} from "react-native";
import React,{useEffect,useState} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { useDataContext } from "../hooks/hooks";
import Geocoder from 'react-native-geocoding';







export default function HomeMap() {

  const {userlatitude,setUserlatitude,userlongitude,setUserlongitude,currentAddress,setCurrentAddress}=useDataContext()
  const [userheading,setUserheading]=useState(0)


  const getCurrentPositionUser=async ()=>{
    // Geolocation.getCurrentPosition(info => console.log(info));
     Geolocation.watchPosition(
    position => {
      const {latitude, longitude,heading} = position.coords;
      setUserlatitude(latitude)
      setUserlongitude(longitude)
      setUserheading(heading)
     
      
    },
    error => {
     
    },{ enableHighAccuracy: true, distanceFilter: 100, interval: 5000, fastestInterval: 2000 }
    
  );
 
  }

const getAllLocData =async(latitude,longitude)=>{

  try {
    Geocoder.from({
      latitude ,
      longitude
    }).then(res=>{
      setCurrentAddress(res.results[0].formatted_address)
      
    })

    
  } catch (error) {
    //console.log(error);
  }
  
}


const getOneTimeLoc=()=>{
  try {
    Geolocation.getCurrentPosition(info => {
      const {latitude,longitude}=info.coords
      getAllLocData(latitude,longitude)
    }, (error) => console.log(error),{
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000 * 60 * 3,
      forceRequestLocation: true,
      showLocationDialog: true,
    });
  } catch (error) {
    console.log(error);
  }
 
}


  useEffect(() => {
   
    getCurrentPositionUser()
     getOneTimeLoc()
  }, [])
    
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#a0abff",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {userlatitude && userlongitude &&<MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: userlatitude,
          longitude: userlongitude,
          latitudeDelta: 0.0492,
          longitudeDelta: 0.0221,
        }}>
       
          <Marker
            draggable
            coordinate={{latitude: userlatitude, longitude: userlongitude}}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 70,
                width: 70,
                resizeMode: 'cover',
                transform: [
                  {
                    rotate: `${userheading}deg`,
                  },
                ],
              }}
              source={require("../../assets/images/top-UberX.png")}
            />
          </Marker>
       
      </MapView>}
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
