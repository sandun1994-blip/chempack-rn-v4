import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {useDataContext} from '../hooks/hooks';
import Consignment from '../pages/Consignment';
const ScanScreen = () => {
  const {direction, setDirection} = useDataContext();
  return (
    <View>
      <Consignment />
    </View>
  );
};

export default ScanScreen;
