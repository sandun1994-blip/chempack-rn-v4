import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigation from './LoginNavigation';
import {useDataContext} from '../hooks/hooks';
import SplashNavigation from './SplashNavigation';
import UserNavigation from './UserNavigation';

const Root = () => {
  const {auth, isLoadingTwo} = useDataContext();

  const user = auth?.accessToken;

  return (
    <NavigationContainer>
      {isLoadingTwo ? (
        <SplashNavigation />
      ) : user ? (
        <UserNavigation />
      ) : (
        <LoginNavigation />
      )}
    </NavigationContainer>
  );
};

export default Root;
