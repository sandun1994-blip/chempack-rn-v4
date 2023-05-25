import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import {useDataContext} from '../hooks/hooks';
import axios from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({navigation}) {
  const {auth, setAuth, setIsLoading, setUserToken} = useDataContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLoading, setuUerLoading] = useState(false);
  // const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(false);
    try {
      const response = await axios.post(
        '/authentication/login',
        JSON.stringify({username, password}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const accessToken = response?.data.token;
      const refreshToken = response?.data.token;

      setAuth({username, password, accessToken, refreshToken});
      // console.log(accessToken);
      if (accessToken) {
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('username', username);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Invalid User', 'Username or password is incorrect', [
        {text: 'Okay'},
      ]);
    }
    setIsLoading(true);
  };

  return (
    <View className="flex justify-between  mx-4" style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View className="flex-row justify-center my-3 mt-5" style={{flex: 1}}>
          <Image
            className="h-60 w-80"
            source={require('../../assets/images/login.png')}
          />
        </View>
        <View className="space-y-2 mx-2" style={{flex: 1}}>
          <Text className={`${colors.heading} text-lg font-bold`}>
            User Name
          </Text>
          <TextInput
            value={username}
            onChangeText={value => setUsername(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} text-lg font-bold`}>
            Password
          </Text>
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
        </View>
      </View>

      <View>
        {userLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
