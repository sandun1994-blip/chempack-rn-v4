import {
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeMap from '../components/HomeMap';
import Message from '../components/Message';
import HomeSearch from '../components/HomeSearch';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDataContext} from '../hooks/hooks';

const HomeScreen = () => {
  const {auth, logout, currentAddress} = useDataContext();
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    androidPermission();
    // CheckAuth(setAuth, auth);
  }, []);
  return (
    <ScreenWrapper>
      <View className="flex-row pb-2 pt-1 items-center px-2 space-x-2 bg-white justify-around ">
        <MaterialCommunityIcons
          name="account-check"
          size={30}
          color="#00CCBB"
        />

        <View className="flex-1 ">
          <Text className="font-bold text-black text-[16px]">
            {auth.username}
          </Text>
          <Text className="font-bold  text-gray-400 text-[11px]">
            {currentAddress.substring(0, 52)}
            <Ionicons name="location" size={25} color="#00CCBB" />
          </Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons name="logout" size={30} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View style={{height: Dimensions.get('window').height - 410}}>
        <HomeMap />
      </View>
      <Message />
      <HomeSearch />
    </ScreenWrapper>
  );
};

export default HomeScreen;
