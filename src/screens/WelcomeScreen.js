import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import WelcomeComp from '../components/WelcomeComp';

export default function WelcomeScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center p-4" />

      <View className="flex-row justify-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require('../../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 mt-20">
        <WelcomeComp />
      </View>
    </ScreenWrapper>
  );
}
