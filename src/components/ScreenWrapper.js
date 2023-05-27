import React from 'react';
import {StatusBar} from 'react-native';

export default function ScreenWrapper({children}) {
  return (
    <>
      <StatusBar barStyle="" hidden={false} translucent={true} />

      {children}
    </>
  );
}
