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