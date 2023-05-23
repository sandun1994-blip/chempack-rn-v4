import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'


export const Context = createContext()

const ContextProvider = ({children}) => {
  const [direction,setDirection] =useState('Start')
    const [auth, setAuth] = useState({});
    const [po, setPo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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

  return (
    <Context.Provider value={{auth, setAuth, po, setPo,isLoading,
       setIsLoading,userToken, setUserToken,userRefreshToken, 
       setUserRefreshToken,userInfo, setUserInfo
      ,poLine, setPoLine, poInitial, setPoInitial,
      direction,setDirection,refernceCode, setRefernceCode,
      refernceScanCode, setRefernceScanCode,refernceScanCodeDisplay, 
      setRefernceScanCodeDisplay,barcode, setBarcode,refernceArray, 
      setRefernceArray,getBarcodeData, setGetBarcodeData}}>
    {children}
    </Context.Provider>
     
  )
}

export default ContextProvider