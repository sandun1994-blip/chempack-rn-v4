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
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {

  React.useEffect(() => {
    requestCameraPermission()
  }, [])
  
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}
