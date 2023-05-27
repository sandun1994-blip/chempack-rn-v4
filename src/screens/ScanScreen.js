import React from 'react';
import Consignment from '../pages/Consignment';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScanScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Consignment />
    </SafeAreaView>
  );
};

export default ScanScreen;
