import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {useDataContext} from '../hooks/hooks';
import Scaner from './Scaner';
import Camera from './cards/Camera';
import axios from '../api/axios';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Loading from './Loading';

const ScanData = ({
  getBarcodeData,
  refernceArray,
  setRefernceArray,
  setMainScanshow,
  references,
}) => {
  const {
    refernceCode,
    setRefernceCode,
    setBarcode,
    direction,
    userLocation,
    auth,
    barcode,
    setUserLocation,
  } = useDataContext();

  const navigation = useNavigation();
  const [viewImage, setViewImage] = useState(false);
  const [camShow, setCamShow] = useState(false);
  const [secondMainScanshow, setSecondMainScanshow] = useState(false);
  const [image, setImage] = useState(null);
  const [signedBy, setSignedBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('A');

  const signedShow = direction === 'End' ? true : false;
  const directionTitle = direction === 'End' ? 'END' : 'START';

  const getAllLocData = async (latitude, longitude) => {
    try {
      Geocoder.from({
        latitude,
        longitude,
      }).then(res => {
        setUserLocation({
          streetAddress: res.results[0].address_components[1].long_name,
          city: res.results[0].address_components[4].long_name,
          country: res.results[0].address_components[5].long_name,
          landmark: res.results[0].address_components[1].long_name,
          postalCode: res.results[0].address_components[6].long_name,
          address: res.results[0].formatted_address,
          geometry: res.results[0].geometry.location,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOneTimeLoc = () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;
          getAllLocData(latitude, longitude);
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 1000 * 60 * 3,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneTimeLoc();
  }, []);

  const handleSubmit = async () => {
    if (userLocation && signedBy != null && signedShow && image) {
      setIsLoading(true);
      try {
        await axios.post(
          '/consignmentroute',
          JSON.stringify({
            location: userLocation,
            barcode,
            locationDateTime: new Date(),
            lastUpdated: new Date(),
            lastUpdatedBy: auth.username,
            status,
            createdBy: auth.username,
            routeDirection: direction,
            signedBy: signedBy,
            consignmentId: getBarcodeData.consignmentId,
            qty: getBarcodeData.qty,
            image: image,
            reference: refernceArray,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          },
        );
        showMessage({
          message: 'success',
          type: 'success',
          backgroundColor: 'green',
          color: 'white',
          animated: false,
          position: 'center',
          icon: 'success',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
        setTimeout(() => {
          setRefernceCode(null);
          setRefernceArray([]);
          setImage(null);
          setBarcode('');
          setMainScanshow(true);
        }, 3000);
      } catch (err) {
        console.log(err);
        showMessage({
          message: 'error',
          type: 'error',
          backgroundColor: '#FF6666', // background color
          color: 'white',
          animated: false,
          position: 'center',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
      }
      setIsLoading(false);
    } else if (userLocation && signedBy === null && !signedShow && image) {
      setIsLoading(true);
      try {
        await axios.post(
          '/consignmentroute',
          JSON.stringify({
            location: userLocation,
            barcode,
            locationDateTime: new Date(),
            lastUpdated: new Date(),
            lastUpdatedBy: auth.username,
            status,
            image,
            createdBy: auth.username,
            routeDirection: direction,
            signedBy: signedBy,
            consignmentId: getBarcodeData.consignmentId,
            qty: getBarcodeData.qty,
            reference: refernceArray,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          },
        );
        showMessage({
          message: 'success',
          type: 'success',
          backgroundColor: 'green', // background color
          color: 'white',
          animated: false,
          position: 'center',
          icon: 'success',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontSize: 16, fontWeight: 'bold'},
        });
        setTimeout(() => {
          // navigation.navigate('Home');
          setRefernceCode(null);
          setRefernceArray([]);
          setImage(null);
          setBarcode('');
          setMainScanshow(true);
        }, 3000);
      } catch (err) {
        console.log(err);
        showMessage({
          message: 'Intenal Error (Restart App) ',
          type: 'error',
          backgroundColor: '#FF6666', // background color
          color: 'white',
          animated: false,
          position: 'center',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
      }
      setIsLoading(false);
    } else {
      if (signedBy == null && signedShow) {
        showMessage({
          message: "Signed By Field Can't Be Empty",
          type: 'error',
          backgroundColor: '#FF6666', // background color
          color: 'white',
          animated: false,
          position: 'center',
          icon: 'danger',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
      } else if (image === null) {
        showMessage({
          message: 'Take a Picture(Touch camera icon)',
          type: 'error',
          backgroundColor: '#FF6666', // background color
          color: 'white',
          animated: true,
          position: 'center',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
      } else {
        showMessage({
          message: "Can't Track Location(On Location)",
          type: 'error',
          backgroundColor: '#FF6666', // background color
          color: 'white',
          animated: false,
          position: 'center',
          duration: 3500,
          style: {
            height: 70,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {fontWeight: 'bold', fontSize: 16},
        });
      }
    }
  };

  const onChangeValue = (item, index) => {
    const newData = refernceArray.map(newItem => {
      if (newItem.id === item.id) {
        return {
          ...newItem,
          selected: !item.selected,
        };
      }
      return newItem;
    });
    setRefernceArray(newData);
  };

  const handleRefernceScanned = isMount => {
    if (isMount) {
      if (references.filter(({id}) => id === refernceCode).length === 1) {
        setRefernceArray(prev =>
          prev.map(item => {
            if (item.id === refernceCode) {
              return {id: refernceCode, selected: true};
            }
            return item;
          }),
        );
      }
    }
    setSecondMainScanshow(false);
  };
  useEffect(() => {
    let isMount = true;
    if (refernceCode?.length > 0) {
      handleRefernceScanned(isMount);
    }
    return () => {
      isMount = false;
    };
  }, [refernceCode]);

  return (
    <>
      {!refernceCode && secondMainScanshow && (
        <View style={styles.barcodeContainer}>
          <Scaner
            barcode={refernceCode}
            setBarcode={setRefernceCode}
            setScanOneShow={setSecondMainScanshow}
          />
        </View>
      )}
      {camShow && <Camera setCamShow={setCamShow} setImage={setImage} />}
      {!secondMainScanshow && !camShow && (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 bg-gray">
            <View className="p-4 border-b border-[#00CCBB] bg-white shadow-xs min-h-[135px]">
              <View className="">
                {getBarcodeData?.consignmentId && (
                  <Text className="text-lg font-bold  text-black pb-2">
                    Consignment Id : {getBarcodeData?.consignmentId}
                  </Text>
                )}
                {getBarcodeData?.toAddressLine1 && (
                  <>
                    <Text className="text-gray-400 ">47 frawent away</Text>
                    <Text className="text-gray-400 "> frawent away.</Text>
                  </>
                )}
                {getBarcodeData?.qty && (
                  <>
                    <Text className="text-lg font-bold  text-black pt-2">
                      Qty : {refernceArray.filter(item => item.selected).length}{' '}
                      of {getBarcodeData?.qty}
                    </Text>
                  </>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setMainScanshow(true);
                  setRefernceArray([]);
                  setBarcode('');
                }}
                className="rounded-full bg-gray-100 absolute  top-3 right-5">
                <MaterialCommunityIcons
                  name="close-circle"
                  size={40}
                  color="#FF6666"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setCamShow(true);
                }}
                className="rounded-full bg-gray-100 absolute  top-[90px] right-5">
                <MaterialCommunityIcons
                  name="camera"
                  size={40}
                  color="#00CCBB"
                />
              </TouchableOpacity>
            </View>

            <View className="bg-[#00CCBB]  pt-5 pb-5">
              <View style={styles.scanInputContainer}>
                <TextInput
                  placeholder="Consignment Id"
                  style={styles.barcodeTextBox}
                  onChangeText={e => setRefernceCode(e)}
                  value={refernceCode}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setRefernceCode('');
                    setSecondMainScanshow(true);
                  }}>
                  <MaterialCommunityIcons
                    name={'barcode-scan'}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="divide-y divide-gray-200 min-h-[10px]">
              {refernceArray.length > 0 &&
                refernceArray.map((item, i) => {
                  return (
                    <View
                      className="flex-row items-center justify-between space-x-3 pl-5 pr-24 bg-white py-2  "
                      key={i}>
                      <View className="flex flex-row justify-around items-center">
                        <MaterialCommunityIcons
                          name="label"
                          size={20}
                          color="#00CCBB"
                        />
                        <Text className=" text-black font-bold ml-3">
                          {item.id}
                        </Text>
                      </View>

                      <CheckBox
                        disabled={false}
                        value={item?.selected}
                        onValueChange={() => onChangeValue(item, i)}
                      />
                    </View>
                  );
                })}
            </ScrollView>

            <View className="pl-2 pr-2 pb-3 bg-white mt-0 space-y-1">
              {image && (
                <Modal visible={viewImage} animationType="slide">
                  <View className="flex-1 bg-[#00CCBB] justify-center items-center p-5">
                    <TouchableOpacity
                      className="rounded-full bg-gray-100 absolute  top-3 right-5"
                      onPress={() => {
                        setViewImage(pre => !pre);
                      }}>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={40}
                        color="#FF6666"
                      />
                    </TouchableOpacity>
                    <Image
                      source={{uri: 'data:image/jpg;base64,' + image}}
                      className="h-3/4 w-full  rounded-md "
                    />
                  </View>
                </Modal>
              )}
              <View className="flex flex-row items-center justify-between  p-2 rounded-lg">
                {image && (
                  <View className=" rounded-lg border-2 border-[#00CCBB]">
                    <TouchableOpacity
                      onPress={() => {
                        setViewImage(pre => !pre);
                      }}>
                      <Image
                        source={{uri: 'data:image/jpg;base64,' + image}}
                        className="h-16 w-20  rounded-md "
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {direction === 'End' && (
                  <TextInput
                    placeholder="Signed By"
                    style={styles.signTextBox}
                    onChangeText={e => setSignedBy(e)}
                    value={signedBy}
                  />
                )}
              </View>

              {isLoading ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  className="rounded-lg bg-[#00CCBB] p-5 "
                  onPress={handleSubmit}>
                  <Text className="text-center text-white text-[25px] font-bold">
                    {directionTitle}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default ScanData;

const styles = StyleSheet.create({
  scanInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  barcodeTextBox: {
    height: 50,
    width: '60%',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
    padding: 10,
    textAlign: 'auto',
    borderRadius: 5,
  },
  signTextBox: {
    height: 50,
    width: '60%',
    borderColor: '#00CCBB',
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
    padding: 10,
    textAlign: 'auto',
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 25,
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#ffffff',
    width: '20%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  barcodeContainer: {
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'space-between',
  },
});
