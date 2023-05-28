/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Root from './src/navigation/Root';
// import {enableLatestRenderer} from 'react-native-maps';
import ContextProvider from './src/context/ContextProvider';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { API_KEY} from '@env';
navigator.geolocation = require('@react-native-community/geolocation');

//enableLatestRenderer();
//navigator.geolocation = require('@react-native-community/geolocation');
Geocoder.init(API_KEY);
export default function App() {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'LOCATION GEO',
          message: 'NEEDS ACCESS TO YOUR LOCATION',
          buttonNeutral: 'ask me later',
          buttonNegative: 'cancel',
          buttonPositive: 'ok',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {},
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('error');
      }
    } catch (error) {}
  };

  useEffect(() => {
    androidPermission();
  }, []);

  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}
