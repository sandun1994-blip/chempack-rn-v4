import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import {KeyboardAvoidingView, Platform} from 'react-native';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}
      style={{flex: 1}}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default LoginNavigation;
