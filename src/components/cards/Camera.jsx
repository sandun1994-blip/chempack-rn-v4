import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React,{useState} from 'react';
import uuid from 'react-native-uuid';
import RNFS from 'react-native-fs';
import {useCamera} from 'react-native-camera-hooks';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Camera = ({setImage, setCamShow}) => {
  const [{cameraRef}, {takePicture, pausePreview, resumePreview}] =
    useCamera(null);
    const [flash,setFlash]=useState('off')
  const capturedHandle = async () => {
    try {
      const options = {quality: 0.1, base64: true};
      //  const dirs = RNFetchBlob.fs.dirs;
      // console.log(dirs.DocumentDir)
      // console.log(dirs.CacheDir)
      // console.log(dirs.DownloadDir)
      // console.log(RNFS.ExternalStorageDirectoryPath );

      const data = await takePicture(options);
      const filePath = data.uri;

      const newFilePath = RNFS.DownloadDirectoryPath + `/${uuid.v4()}.jpg`;
      //console.log(filePath);
      // console.log(RNFS.ExternalStorageDirectoryPath);
      setImage(data.base64);
      RNFS.moveFile(filePath, newFilePath)
        .then(() => { })
        .catch(err => console.log(err));
      setCamShow(false);

      // await RNFetchBlob.fs.mv(filePath,newFilePath)
      // .then(url=>{console.log(1,url)}).catch(err=>console.log(err.message))
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <RNCamera
      ref={cameraRef}
      type={RNCamera.Constants.Type.back}
      style={styles.preview}
      flashMode={flash}
      autoFocus='on'
      pausePreview={true}>
      <TouchableOpacity style={styles.button} onPress={capturedHandle}>
      <MaterialCommunityIcons
            name={'circle-slice-8'}
            size={98}
            color="#FFFFFF"
          />
      </TouchableOpacity>

      {flash==='off'?(
        <TouchableOpacity
        className="rounded-full bg-gray-100 absolute  top-4 left-5"
           onPress={() => {
            setFlash('torch')
          }}>
          <MaterialCommunityIcons
            name={'flash'}
            size={40}
            color="#00CCBB"
          />

        </TouchableOpacity>):(<TouchableOpacity
         className="rounded-full bg-gray-100 absolute  top-4 left-5"
           onPress={() => {
            setFlash('off')
          }}>
          <MaterialCommunityIcons
            name={'flash-off'}
            size={40}
            color="#00CCBB"
          />

        </TouchableOpacity>)}

      <TouchableOpacity
                onPress={() => {
                  setCamShow(false)
                  setImage(null)
                }}
                className="rounded-full bg-gray-100 absolute  top-3 right-5">
                <MaterialCommunityIcons
                  name="close-circle"
                  size={40}
                  color="#FF6666"
                />
              </TouchableOpacity>
    </RNCamera>
  );
};

export default Camera;

const styles = StyleSheet.create({
  preview: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
