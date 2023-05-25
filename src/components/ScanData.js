import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

const ScanData = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center text-black">
              Basket
            </Text>
            <Text className="text-gray-400 text-center">Back</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute  top-3 right-5">
            <MaterialCommunityIcons
              name="close-circle"
              size={50}
              color="#00CCBB"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-4 bg-white my-5">
          <Image
            source={{uri: 'https://links.papareact.com/wru'}}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full "
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>

          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text>1x</Text>
            <Image
              source={{uri: 'https://links.papareact.com/wru'}}
              className="h-12 w-12  rounded-full "
            />
            <Text className="flex-1">name</Text>

            <Text className="text-gray-600">
              currency
              <MaterialCommunityIcons
                name="currency-usd"
                size={20}
                color="#00CCBB"
              />
            </Text>
          </View>

          <View className="flex-row items-center space-x-3 bg-white py-2 px-5 ">
            <Text>1x</Text>
            <Image
              source={{uri: 'https://links.papareact.com/wru'}}
              className="h-12 w-12  rounded-full "
            />
            <Text className="flex-1">name</Text>

            <Text className="text-gray-600">
              currency
              <MaterialCommunityIcons
                name="currency-usd"
                size={20}
                color="#00CCBB"
              />
            </Text>
          </View>
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text>555</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery</Text>
            <Text>45</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-extrabold">ordert otal</Text>
            <Text>45</Text>
          </View>

          <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanData;
