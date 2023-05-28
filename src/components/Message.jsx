import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Message() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Delivery </Text>
      <Text style={styles.text}>
      Delivery Service Is Moving  Start To End,You May Touch Either Start Or End.
      </Text>
      
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2b80ff',
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {color: 'white', fontSize: 15, marginBottom: 10,fontWeight:'600'},
    
  });
