import {View, Text, Dimensions, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeMap from '../components/HomeMap';
import Message from '../components/Message';
import HomeSearch from '../components/HomeSearch';
//import {CheckAuth} from '../lib';
import {useDataContext} from '../hooks/hooks';


const HomeScreen = () => {
  const {setAuth, auth} = useDataContext();

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'LOCATION GEO',
          message: ' NEEDS ACCESS TO YOUR LOCATION',
          buttonNeutral: 'ask me later',
          buttonNegative: 'cancel',
          buttonPositive: 'ok',
        },
      );
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    console.log('render');
    androidPermission();
    // CheckAuth(setAuth, auth);
  }, []);
  return (
    <ScreenWrapper>
      <View style={{height: Dimensions.get('window').height - 400}}>
        {/* <HomeMap /> */}
      </View>
      <Message />
      <HomeSearch />
    </ScreenWrapper>
  );
};

export default HomeScreen ;
