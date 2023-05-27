import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,

} from 'react-native';
import React, { useEffect } from 'react';
import { useDataContext } from '../../hooks/hooks';
import axios from 'axios'
import ScanData from '../ScanData';


const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
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
  setMainScanshow,
  barcode,
  status,
  userLocation,
  showMessage,
  getBarcodeData,
  isLoading,
  setIsLoading,
  navigation,
  image,
  signedBy,
  references,
  setReferences,
}) => {



  useEffect(() => {
    requestStoragePermission()
  }, [])



  const {
    direction,
    auth,
    setRefernceCode,
    setRefernceScanCode,
    setRefernceScanCodeDisplay,
    refernceArray,
    setRefernceArray,
  } = useDataContext();

  const singedShow = direction === 'End' ? true : false;
  const directionTitle = direction === 'End' ? 'END' : 'START';





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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
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
          titleStyle: { fontFamily: 'Teko', fontSize: 16 },
        });
      }
    }
  };


  return (
    <>




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
      <ScanData getBarcodeData={getBarcodeData}
        singedShow={singedShow}
        refernceArray={refernceArray}
        setRefernceArray={setRefernceArray}
        image={image}
        references={references}
        setReferences={setReferences}
        setMainScanshow={setMainScanshow}
      />


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
