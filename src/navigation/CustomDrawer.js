import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Test from '../test';

const CustomDrawer = props => {
  const handleLogout = () => {};
  return (
    <DrawerContentScrollView {...props}>
      <View className="bg-black p-5 mx-2 my-2 rounded-md">
        <View>
          <View>
            <Text className="text-white font-serif font-bold text-xl">
              Sandun Tharuka
            </Text>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />
      <View>
        <TouchableOpacity className="p-2 px-5  w-32" onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
