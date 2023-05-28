import {  TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../theme';

export default function BackButton() {
  
    const navigation = useNavigation();
   
  return (
    <TouchableOpacity onPress={()=> {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }else{
            navigation.navigate('Login')
        }
        }} className="bg-white rounded-full h-8 w-8">
      <AntDesign name={'left'} size={30} color={colors.button}  /> 
    </TouchableOpacity>
  )
}