import jwt_decode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext()

const ContextProvider = ({ children }) => {
  const [direction, setDirection] = useState('Start')
  const [auth, setAuth] = useState({});
  const [po, setPo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTwo, setIsLoadingTwo] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userRefreshToken, setUserRefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [poLine, setPoLine] = useState([])
  const [poInitial, setPoInitial] = useState([])
  const [refernceCode, setRefernceCode] = useState(null)
  const [refernceScanCode, setRefernceScanCode] = useState(false)
  const [refernceScanCodeDisplay, setRefernceScanCodeDisplay] = useState(false)
  const [barcode, setBarcode] = useState('');
  const [refernceArray, setRefernceArray] = useState([]);
  const [getBarcodeData, setGetBarcodeData] = useState({});
  const [userlatitude,setUserlatitude] =useState(null)
  const [userlongitude,setUserlongitude] =useState(null)
  const [currentAddress,setCurrentAddress] =useState('')
  const [userLocation,setUserLocation] =useState(null)


  const logout = () => {
    AsyncStorage.removeItem('userToken')
    setUserToken(null)
    setAuth({ ...auth, accessToken: null })
  }

  const isLoginIn = async () => {
    setIsLoadingTwo(true)
    try {
      const tokenInfo = await AsyncStorage.getItem('userToken')
      const userInfo = await AsyncStorage.getItem('username')


      if (tokenInfo) {

        let decodedToken = jwt_decode(tokenInfo);
        let currentDate = new Date();

        if (decodedToken.exp * 1000 < currentDate.getTime()) {

          setAuth({ ...auth, accessToken: null });
          AsyncStorage.removeItem('userToken');
        } else {

          setAuth({ ...auth, accessToken: tokenInfo, username: userInfo })
        }
      }
    } catch (error) {
      console.log(error, 'yo');
    }
    setIsLoadingTwo(false)
  }

  useEffect(() => {
    let mount = true
    if (mount) {
      isLoginIn()
    }
    return () => { mount = false }
  }, [])

  return (
    <Context.Provider value={{
      auth, setAuth, po, setPo, isLoading,
      setIsLoading, userToken, setUserToken, userRefreshToken,
      setUserRefreshToken, userInfo, setUserInfo
      , poLine, setPoLine, poInitial, setPoInitial,
      direction, setDirection, refernceCode, setRefernceCode,
      refernceScanCode, setRefernceScanCode, refernceScanCodeDisplay,
      setRefernceScanCodeDisplay, barcode, setBarcode, refernceArray,
      setRefernceArray, getBarcodeData, setGetBarcodeData, logout, isLoadingTwo,
      userlatitude,setUserlatitude,userlongitude,setUserlongitude,
      currentAddress,setCurrentAddress,userLocation,setUserLocation
      
    }}>
      {children}
    </Context.Provider>

  )
}

export default ContextProvider