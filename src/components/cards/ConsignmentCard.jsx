import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Image,
  PermissionsAndroid,

} from 'react-native';
import React, {useEffect} from 'react';
import { useDataContext } from '../../hooks/hooks';
import axios from 'axios'
import ScanData from '../ScanData';


const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('You can use the camera');
    // } else {
    //   console.log('Camera permission denied');
    // }
  } catch (err) {
    console.warn(err);
  }
};



const ConsignmentCard = ({
  barcode,
  status,
  userLocation,
  showMessage,
  getBarcodeData,
  isLoading,
  setIsLoading,
  navigation,
  mainScanerDisplay,
  setMainScanerDisplay,
  image,
  setImage,
  setCamShow,
  camShow,
  camera,
  signedBy,
  setSignedBy,
  references,
  setReferences,
  consignmentIndex,
}) => {



    useEffect(() => {
    requestStoragePermission()
  }, [])



  const {
    direction,
    setDirection,
    auth,
    setRefernceCode,
    setRefernceScanCode,
    setRefernceScanCodeDisplay,
    refernceArray,
    setRefernceArray,
  } = useDataContext();

  const singedShow = direction === 'End' ? true : false;
  const directionTitle = direction === 'End' ? 'END' : 'START';


  const onChangeValue = (item, index) => {
    const newData = refernceArray.map(newItem => {
      if (newItem.id == item.id) {
        return {
          ...newItem,
          selected: !item.selected,
        };
      }
      return newItem;
    });
    setRefernceArray(newData);
  };


  const handleSubmit = async () => {
    if (userLocation.length > 0 && signedBy != null && singedShow) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'consignmentroute',
          JSON.stringify({
            location: userLocation[0],
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
            image: image?.base64,
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
          // backgroundColor: "red", // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
        setTimeout(() => {
          navigation.navigate('RouteDirection');
          setRefernceCode(null);
          setRefernceScanCode(false);
          setRefernceScanCodeDisplay(false);
          setRefernceArray([]);
        }, 3000);
      } catch (err) {
        console.log(err);
        showMessage({
          message: 'error',
          type: 'error',
          backgroundColor: 'red', // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
      }
      setIsLoading(false);
    } else if (userLocation.length > 0 && signedBy === null && !singedShow) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'consignmentroute',
          JSON.stringify({
            location: userLocation[0],
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
          // backgroundColor: "red", // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
        setTimeout(() => {
          navigation.navigate('RouteDirection');
          setRefernceCode(null);
          setRefernceScanCode(false);
          setRefernceScanCodeDisplay(false);
          setRefernceArray([]);
        }, 3000);
      } catch (err) {
        console.log(err);
        showMessage({
          message: 'error',
          type: 'error',
          backgroundColor: 'red', // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
      }
      setIsLoading(false);
    } else {
      if (signedBy == null && singedShow) {
        showMessage({
          message: "Signed By Field Can't Be Empty",
          type: 'serror',
          backgroundColor: 'red', // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
      } else {
        showMessage({
          message: "Can't Track Location(On Location)",
          type: 'serror',
          backgroundColor: 'red', // background color
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
          titleStyle: {fontFamily: 'Teko', fontSize: 16},
        });
      }
    }
  };


  return (
    <>
   <View style={{marginRight: 15, marginLeft: 15, paddingBottom: 100}}>

    <ScanData/>

        {isLoading && (
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.indicatorText}>Loading Data...</Text>
            <ActivityIndicator
              size={'small'}
              style={styles.indicator}
              color="yellow"
            />
          </View>
        )}

        {getBarcodeData?.toAddressLine1 && (
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 18, fontFamily: 'Teko'}}>
              {getBarcodeData.toAddressLine1},
            </Text>
            <Text style={{fontSize: 18, fontFamily: 'Teko', paddingBottom: 10}}>
              {getBarcodeData.toAddressLine2}
            </Text>
          </View>
        )}

        {getBarcodeData?.qty && (
          <View
            style={{
              marginBottom: 5,
              marginLeft: 20,
              fontSize: 20,
              fontFamily: 'Teko',
            }}>
            <Text style={{color: 'yellow', fontFamily: 'Teko', fontSize: 18}}>
              Qty : {refernceArray.filter(item => item.selected).length} of{' '}
              {getBarcodeData?.qty}
            </Text>
          </View>
        )}
        {refernceArray.length > 0 && (
          <View style={{paddingBottom: 10}}>
            {refernceArray.map((item, i) => (
              <View
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginLeft: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '900'}}>
                  {item.id}
                </Text>
               
              </View>
            ))}
          </View>
        )}

     

        <View>
          <View style={{marginBottom: 0, marginLeft: 20, fontFamily: 'Teko'}}>
            {getBarcodeData?.consignmentId && (
              <Text style={{color: 'black', fontFamily: 'Teko', fontSize: 18}}>
                Consignment Id : {getBarcodeData?.consignmentId}
              </Text>
            )}
          </View>
        </View>

        {singedShow && (
          <View style={styles.containerCamera}>
            <TouchableOpacity
              style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: 5,
              }}
              onPress={() => setCamShow(!camShow)}>
              <Entypo name="camera" size={28} color="white" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: 20,
                  color: 'white',
                }}>
                Click here to take a photo
              </Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{uri: 'data:image/jpg;base64,' + image.base64}}
                style={{width: 300, height: 200, borderRadius: 10}}
              />
            )}
          </View>
        )}
       
      </View>


    </>
  );
};

export default ConsignmentCard;

const styles = StyleSheet.create({
  buttonTwo: {
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 5,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#285092',
    width: 90,
    marginTop: 10,
    marginLeft: 10,
    height: 50,
  },
  buttonThree: {
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 7,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#285092',
    width: 90,
    marginTop: 10,
    marginLeft: 10,
    height: 50,
  },
  textg: {
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textRow: {
    fontSize: 8,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  container: {
    paddingTop: 4,
    backgroundColor: '#ddd',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },

  container: {
    paddingTop: 4,
    backgroundColor: '#ddd',
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    marginLeft: 40,
  },
  indicator: {
    padding: 5,
    borderRadius: 12,
    color: 'white',
    marginTop: 0,
    fontWeight: 'bold',
  },
  indicatorText: {
    fontSize: 18,
    marginRight: 15,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCamera: {
    padding: 10,
    justifyContent: 'center',
  },
 
  
});
