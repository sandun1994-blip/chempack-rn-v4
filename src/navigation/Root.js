import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DummyScreen = props => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
);

const Root = () => {
  const user = true;
  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
          <Drawer.Screen name="Route Direction" component={AppNavigation} />
          <Drawer.Screen name="Your Trips">
            {() => <DummyScreen name={'Your Trips'} />}
          </Drawer.Screen>

          <Drawer.Screen name="Help">
            {() => <DummyScreen name={'Help'} />}
          </Drawer.Screen>

          <Drawer.Screen name="Wallet">
            {() => <DummyScreen name={'Wallet'} />}
          </Drawer.Screen>

          <Drawer.Screen name="Settings">
            {() => <DummyScreen name={'Settings'} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <AppNavigation />
      )}
    </NavigationContainer>
  );
};

export default Root;
