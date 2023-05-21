import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Audio } from 'expo-av';
// import { useDataContext } from '../hooks/hooks';

import { useDataContext } from '../hooks/hooks';
// import ConsignmentCard from '../cards/ConsignmentCard';
// import axios from '../api/axios';
// import config from '../config';
// import { Camera, CameraType } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';




const ScanerConsignment = ({ showMessage,userLocation,navigation }) => {

  const { auth,refernceCode, setRefernceCode,refernceScanCode, setRefernceScanCode,refernceScanCodeDisplay, setRefernceScanCodeDisplay,barcode, setBarcode,refernceArray, setRefernceArray,getBarcodeData, setGetBarcodeData } = useDataContext()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  const [mainScanerDisplay, setMainScanerDisplay] = useState(true);
  const [sound, setSound] = React.useState();
  const [status, setStatus] = useState('A');
  const [rd, setRd] = useState('Start');
 
  const [isLoading, setIsLoading] = useState(false);
  // const [type, setType] = useState(CameraType.back);
  const camera = useRef(null)
  const [camShow,setCamShow] =useState(false)
  const [image, setImage] = useState(null);
  const [signedBy, setSignedBy] = useState(null)
  const [references, setReferences] = useState([])
  const [consignmentIndex,setConsignmentIndex] =useState(0)
 


  // useEffect(()=>{
  //   (async()=>{
  //       MediaLibrary.requestPermissionsAsync()
  //   })()
  //     },[])
  
  // async function playSound() {

  //   const { sound } = await Audio.Sound.createAsync(require('../assets/beep.mp3'));
  //   setSound(sound);


  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {

  //       sound.unloadAsync();
  //     }
  //     : undefined;
  // }, [sound]);
  // const getBarcodeDetails = async () => {

  //   setIsLoading(true)
  //   try {
  //     const res = await axios.get(`${config.BASE_URL}machship/searchConsignments/${barcode}`, { headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` } },)
      
  //     const referencesArray=res.data?.object[0].consignmentItems[0]?.references.map(ref=>{

  //       if (ref===barcode) {
  //         return { id:ref,selected:true}}
  //         return { id:ref,selected:false}
  //       }

       
  //        )
        
  //        const findgetConsignmentId = referencesArray.findIndex(({id}) => id === barcode)
  //       setConsignmentIndex(findgetConsignmentId+1)
  //       setRefernceScanCodeDisplay(true)
  //     setReferences(referencesArray)
  //     setRefernceArray(referencesArray)
  //     const obj=res.data?.object[0]

  //  setGetBarcodeData({ consignmentId:obj?.id,toAddressLine1:obj?.toAddressLine1,toAddressLine2:obj?.toAddressLine2,qty:obj?.consignmentItems[0]?.quantity})
       
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsLoading(false)
  // }


  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    setHasPermission(status === 'granted');
  };
  useEffect(() => {


    getBarCodeScannerPermissions();
  }, []);

  // useEffect(() => {

  //   if (barcode.length > 3) {
  //     getBarcodeDetails()

  //   }

  // }, [barcode])

  const handleBarCodeScanned = ({ type, data }) => {
   
    setScanned(true);
    setBarcode(data)
    


  };


  const handleRefernceScanned = ({ type, data }) => {
   
    setRefernceScanCode(true);
    setRefernceCode(data)
    if (references.filter(({id})=>id===data).length===1) {
      setRefernceArray(prev=>prev.map(item=>{
        if (item.id ===data) {
          return { id:data,selected:true}
        }
        return item
      }))
      
    }
   


  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  return (<>
    {!camShow  && !refernceScanCodeDisplay && <View style={{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',


    }} >
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: 500, height: 500 }}
        /></View></View>}

{!camShow  && refernceScanCodeDisplay && <View style={{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',


    }} >
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={refernceScanCode ? undefined : handleRefernceScanned}
          style={{ width: 500, height: 500 }}
        /></View></View>}


  { !camShow && !refernceScanCodeDisplay && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
      <TextInput placeholder='Consignment Id' style={{
        height: 50,
        width:195,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        color: 'black',
        padding: 10,
        textAlign: 'auto',
        marginTop: 20,
        borderRadius: 5,
        marginLeft: 20
      }} onChangeText={(e) => setBarcode(e)} value={barcode} />
      <TouchableOpacity style={{ ...styles.button, ...{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }} onPress={() => {  setScanned(false), setBarcode(''), setMainScanerDisplay(true)}}>
        {/* <MaterialCommunityIcons name="barcode-scan" size={24} color="white" /> */}
        <Text style={{ ...styles.text, ...{ fontFamily: 'Teko', marginTop: 8 } }}>SCAN</Text>
      </TouchableOpacity>

    </View>}
    { !camShow && refernceScanCodeDisplay && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
      <TextInput placeholder='Consignment Id' style={{
        height: 50,
        width:195,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        color: 'black',
        padding: 10,
        textAlign: 'auto',
        marginTop: 20,
        borderRadius: 5,
        marginLeft: 20
      }} onChangeText={(e) => setRefernceCode(e)} value={refernceCode} />
      <TouchableOpacity style={{ ...styles.button, ...{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'red' } }} onPress={() => {  setRefernceScanCode(false), setRefernceCode(''), setMainScanerDisplay(true)}}>
        {/* <MaterialCommunityIcons name="barcode-scan" size={24} color="white" /> */}
        <Text style={{ ...styles.text, ...{ fontFamily: 'Teko', marginTop: 8 } }}>SCAN</Text>
      </TouchableOpacity>

    </View>}


    
  
     </>
  );
}

export default ScanerConsignment

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#285092',
    width: 130,
    marginTop: 20,
    marginRight: 10,
    height: 50
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 370,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'black',
    marginTop: 5
  },
  container: {
   
    backgroundColor: '#004D40',
    marginTop:14,
    paddingBottom: 190,

  },
  containerCamera: {
    height: '100%',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainerCamera: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  buttonCamera: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  textCamera: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});