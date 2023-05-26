import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import RNFS from 'react-native-fs';
import {useCamera} from 'react-native-camera-hooks';
import {RNCamera} from 'react-native-camera';

const Camera = ({setImage, setCamShow}) => {
  const [{cameraRef}, {takePicture, pausePreview, resumePreview}] =
    useCamera(null);

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
      console.log(error);
    }
  };

  return (
    <RNCamera
      ref={cameraRef}
      type={RNCamera.Constants.Type.back}
      style={styles.preview}
      pausePreview={true}>
      <TouchableOpacity style={styles.button} onPress={capturedHandle}>
        <Text style={styles.buttonText}>click</Text>
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
    backgroundColor: '#fff',
    borderRadius: 10,
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
