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






        function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise((resolve, reject) => {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${myApiKey}&mode=retrieveAddresses&prox=${latitude},${longitude}`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          if (resJson
            && resJson.Response
            && resJson.Response.View
            && resJson.Response.View[0]
            && resJson.Response.View[0].Result
            && resJson.Response.View[0].Result[0]) {
            resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
          } else {
            reject('not found')
          }
        })
        .catch((e) => {
          reject(e);
        })
    })
  }