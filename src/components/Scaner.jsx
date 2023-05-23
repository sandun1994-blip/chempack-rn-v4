import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RNCamera } from 'react-native-camera';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Scaner = ({ barcode, setBarcode, setScanOneShow }) => {

  // console.log(RNCamera.Constants.FlashMode.torch);
  // flashMode={RNCamera.Constants.FlashMode.torch}
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.52,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  return (
    <>
      <QRCodeScanner
        showMarker
        onRead={d => {
          setBarcode(d.data);
        }}
        
        cameraStyle={{ height: SCREEN_HEIGHT - 200 }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>

            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>

                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * 0.4
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }


      />

      <View
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          height: 125,
          position: 'absolute',
          bottom: '-24%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection:'row'

        }}>


        <TouchableOpacity
           onPress={() => {
            setScanOneShow(false)
            setBarcode('')
          }}>
          <Fontisto
            name={'backward'}
            size={25}
            color="black"
          />

        </TouchableOpacity>

        <TouchableOpacity
           onPress={() => {
            setScanOneShow(false)
            setBarcode('')
          }}>
          <Fontisto
            name={'nav-icon-list'}
            size={28}
            color="black"
          />

        </TouchableOpacity>

        <TouchableOpacity
           onPress={() => {
            setScanOneShow(false)
            setBarcode('')
          }}>
          <Fontisto
            name={'forward'}
            size={25}
            color="black"
          />

        </TouchableOpacity>
        
        
        </View>
    </>
  );
};

const overlayColor = ''; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.010; // this is equivalent to 2 from a 393 device width
const rectBorderColor = '#0FFF50';

const scanBarWidth = SCREEN_WIDTH * 0.7; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0095; //this is equivalent to 1 from a 393 device width
const scanBarColor = 'white';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: 100,
  },
  rectangle: {
    height: SCREEN_HEIGHT - 350,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
    
  },
  
});

export default Scaner;
