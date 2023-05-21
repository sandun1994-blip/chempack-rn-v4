import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'


export const Context = createContext()

const ContextProvider = ({children}) => {
  const [direction,setDirection] =useState('Start')

  return (
    <Context.Provider value={{direction,setDirection}}>
    {children}
    </Context.Provider>
     
  )
}

export default ContextProvider