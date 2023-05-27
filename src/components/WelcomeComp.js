import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../theme';

export default function WelcomeComp() {
  const navigation = useNavigation();

  return (
    <View className="h-auto flex justify-around">
      <View className="mx-5 mb-10">
        <Text
          className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
          WELCOME
        </Text>
        <TouchableOpacity
          className="shadow p-3 rounded-full mb-5"
          style={{backgroundColor: colors.button}}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text className="text-center text-white text-lg font-bold">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
