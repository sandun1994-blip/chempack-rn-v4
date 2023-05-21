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

// enableLatestRenderer();
// navigator.geolocation = require('@react-native-community/geolocation');

export default function App() {
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}
