import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useDataContext} from '../hooks/hooks';
import Consignment from '../pages/Consignment';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScanScreen = () => {
  const {direction, setDirection} = useDataContext();
  return (
    <SafeAreaView className="bg-white flex-1">
      <Consignment />
    </SafeAreaView>
  );
};

export default ScanScreen;
