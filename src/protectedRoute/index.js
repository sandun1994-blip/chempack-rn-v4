import React from 'react';
import jwt_decode from 'jwt-decode';
import {useDataContext} from '../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckAuth = Component => {
  return function CheckAuth(props) {
    const {setAuth, auth} = useDataContext();

    let decodedToken = jwt_decode(auth?.accessToken);
    let currentDate = new Date();
    console.log('render check');
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      setAuth({...auth, accessToken: null});
      AsyncStorage.removeItem('userToken');
      //   return <SignInScreen/>
    } else {
      return <Component {...props} />;
    }
  };
};

export default CheckAuth;
