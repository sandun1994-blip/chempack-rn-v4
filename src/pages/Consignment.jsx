import {View, Text, StyleSheet,Dimensions, ScrollView,TouchableOpacity,TextInput} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Scaner from '../components/Scaner';
import Fontisto from 'react-native-vector-icons/Fontisto';


const SCREEN_HEIGHT = Dimensions.get('window').height-100;
const Consignment = () => {
  const [barcode, setBarcode] = useState('');
  const [scanOneShow, setScanOneShow] = useState(false);

 
  return (
    <>
   { !barcode &&scanOneShow && <View style={{height: '90%', backgroundColor: '#FFFFFF',alignItems:'center',marginTop:0,justifyContent:'space-between'}}>
        <Scaner barcode={barcode} setBarcode={setBarcode} setScanOneShow={setScanOneShow} /> 
    </View>}

   { !scanOneShow &&<ScrollView>
<View className='bg-red-700  pt-6'>
  
<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          
        }}>

<TextInput placeholder='Consignment Id' style={{
        height: 50,
        width:'60%',
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        color: 'black',
        padding: 10,
        textAlign: 'auto',
        borderRadius: 5,
       
      }} onChangeText={(e) => setBarcode(e)} value={barcode} />


<TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(barcode);
            setScanOneShow(true)
            setBarcode('')
          }}>
          <Fontisto
            name={'backward'}
            size={15}
            color="white"
          />
          <Text style={{...styles.text}}>SCAN</Text>
        </TouchableOpacity></View>
  <Text>{barcode}</Text>
</View>
    </ScrollView>}
    </>
  );
};

export default Consignment;

const styles = StyleSheet.create({
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height:750,
    width: 370,
    overflow: 'hidden',
    margin: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'linen',
  },
  square1: {
    height: 450,
    width: 450,
  },
  square: {
    height: 70,
    width: 70,
  },
  cameraContainerStyle: {
    alignItems: 'center',
  },
  cameraStyle: {
    alignItems: 'center',
  },
  markerStyle: {
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 25,
    height: 150,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 25,
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#285092',
    width: '30%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 900,
  },
});

{
  /* <QRCodeScanner
onRead={data => {
  setCode(data.data);
}}
fadeIn={true}
reactivate={true}
reactivateTimeout={1000}
showMarker={true}
containerStyle={styles.container}
cameraContainerStyle={styles.cameraContainerStyle}
cameraStyle={styles.cameraStyle}
markerStyle={styles.markerStyle}
/>
<Text className="text-lg text-red-600">:{code}</Text> */
}
