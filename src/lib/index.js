import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckAuth = (setAuth, auth) => {
  if (auth?.accessToken) {
    let decodedToken = jwt_decode(auth?.accessToken);
    let currentDate = new Date();
    console.log('check');
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log('check2');
      setAuth({...auth, accessToken: null});
      AsyncStorage.removeItem('userToken');
    }
  }
};
