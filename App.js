/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import Root from './src/navigation/Root';
import {enableLatestRenderer} from 'react-native-maps';
import ContextProvider from './src/context/ContextProvider';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// enableLatestRenderer();
// navigator.geolocation = require('@react-native-community/geolocation');

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {

  // React.useEffect(() => {
  //   requestCameraPermission()
  // }, [])
  
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}
