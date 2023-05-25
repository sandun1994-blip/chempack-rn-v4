import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar,SafeAreaView, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function ScreenWrapper({children}) {


    const isDarkMode = useColorScheme() === 'dark'; 

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    
  return (
    <View >
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        {children}
        </View>
      
    
  )
}