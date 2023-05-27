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

const ScanData = ({
  getBarcodeData,
  refernceArray,
  setRefernceArray,
  setMainScanshow,
  references,
}) => {
  const {refernceCode, setRefernceCode, setBarcode, direction} =
    useDataContext();

  const [viewImage, setViewImage] = useState(false);
  const [camShow, setCamShow] = useState(false);
  const [secondMainScanshow, setSecondMainScanshow] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleRefernceScanned = () => {
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
  };
  useEffect(() => {
    if (refernceCode?.length > 0) {
      handleRefernceScanned();
    }
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
                  <View className="flex-1 bg-[#00CCBB] justify-center items-center">
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
                      source={{uri: 'data:image/jpg;base64,' + image.base64}}
                      className="h-40 w-40  rounded-md "
                    />
                  </View>
                </Modal>
              )}
              <View className="flex flex-row items-center justify-between bg-[#00CCBB] p-2 rounded-lg">
                {image && (
                  <View className=" rounded-lg">
                    <TouchableOpacity
                      onPress={() => {
                        setViewImage(pre => !pre);
                      }}>
                      <Image
                        source={{uri: 'data:image/jpg;base64,' + image.base64}}
                        className="h-16 w-20  rounded-md "
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {direction === 'End' && (
                  <TextInput
                    placeholder="Signed By"
                    style={styles.signTextBox}
                    onChangeText={e => setRefernceCode(e)}
                    value={refernceCode}
                  />
                )}
              </View>

              <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-5 ">
                <Text className="text-center text-white text-[25px] font-bold">
                  {direction}
                </Text>
              </TouchableOpacity>
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
    borderColor: 'white',
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
