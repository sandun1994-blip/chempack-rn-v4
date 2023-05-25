import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Scaner from '../components/Scaner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useDataContext} from '../hooks/hooks';
import ConsignmentCard from '../components/cards/ConsignmentCard';
import Camera from '../components/cards/Camera';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

const SCREEN_HEIGHT = Dimensions.get('window').height - 100;
const Consignment = ({userLocation, navigation}) => {
  const {
    auth,
    refernceCode,
    setRefernceCode,
    refernceScanCode,
    setRefernceScanCode,
    refernceScanCodeDisplay,
    setRefernceScanCodeDisplay,
    barcode,
    setBarcode,
    refernceArray,
    setRefernceArray,
    getBarcodeData,
    setGetBarcodeData,
  } = useDataContext();

  const [scanOneShow, setScanOneShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [mainScanerDisplay, setMainScanerDisplay] = useState(true);
  const [sound, setSound] = useState();
  const [status, setStatus] = useState('A');
  const [rd, setRd] = useState('Start');
  const camera = useRef(null);
  // const [type, setType] = useState(CameraType.back);

  const [camShow, setCamShow] = useState(false);
  const [image, setImage] = useState(null);
  const [signedBy, setSignedBy] = useState(null);
  const [references, setReferences] = useState([]);
  const [consignmentIndex, setConsignmentIndex] = useState(0);

  const getBarcodeDetails = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://com.au:3000/machship/searchConsignments/${barcode}`,
        {
          headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );

      const referencesArray =
        res.data?.object[0].consignmentItems[0]?.references.map(ref => {
          if (ref === barcode) {
            return {id: ref, selected: true};
          }
          return {id: ref, selected: false};
        });

      const findgetConsignmentId = referencesArray.findIndex(
        ({id}) => id === barcode,
      );
      setConsignmentIndex(findgetConsignmentId + 1);
      setRefernceScanCodeDisplay(true);
      setReferences(referencesArray);
      setRefernceArray(referencesArray);
      const obj = res.data?.object[0];

      setGetBarcodeData({
        consignmentId: obj?.id,
        toAddressLine1: obj?.toAddressLine1,
        toAddressLine2: obj?.toAddressLine2,
        qty: obj?.consignmentItems[0]?.quantity,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (barcode.length > 0) {
      getBarcodeDetails();
    }
  }, [barcode]);

  return (
    <>
      {!barcode && scanOneShow && (
        <View style={styles.barcodeContainer}>
          <Scaner
            barcode={barcode}
            setBarcode={setBarcode}
            setScanOneShow={setScanOneShow}
          />
        </View>
      )}
      {camShow && <Camera setCamShow={setCamShow} setImage={setImage} />}
      {!scanOneShow && (
        <ScrollView className="bg-red-400">
          <View className="bg-red-700  pt-6">
            <View style={styles.scanInputContainer}>
              <TextInput
                placeholder="Consignment Id"
                style={styles.barcodeTextBox}
                onChangeText={e => setBarcode(e)}
                value={barcode}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log(barcode);
                  setScanOneShow(true);
                  setBarcode('');
                }}>
                <MaterialCommunityIcons
                  name={'barcode-scan'}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Text>{barcode}</Text>
          </View>

          <ConsignmentCard
            barcode={barcode}
            status={status}
            setStatus={setStatus}
            rd={rd}
            setRd={setRd}
            userLocation={userLocation}
            showMessage={showMessage}
            navigation={navigation}
            getBarcodeData={getBarcodeData}
            setGetBarcodeData={setGetBarcodeData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mainScanerDisplay={mainScanerDisplay}
            setMainScanerDisplay={setMainScanerDisplay}
            camShow={camShow}
            setCamShow={setCamShow}
            image={image}
            setImage={setImage}
            camera={camera}
            signedBy={signedBy}
            setSignedBy={setSignedBy}
            references={references}
            setReferences={setReferences}
            consignmentIndex={consignmentIndex}
          />
        </ScrollView>
      )}
      <FlashMessage position="bottom" />
    </>
  );
};

export default Consignment;

const styles = StyleSheet.create({
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 750,
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
    backgroundColor: '#ffffff',
    width: '20%',
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
  barcodeContainer: {
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'space-between',
  },
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
