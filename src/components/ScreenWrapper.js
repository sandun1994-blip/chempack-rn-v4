import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function ScreenWrapper({children}) {
  return (
    <>
      <StatusBar barStyle="" hidden={false} translucent={true} />
      <SafeAreaView>{children}</SafeAreaView>
    </>
  );
}
