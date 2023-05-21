import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";
import { useDataContext } from "../hooks/hooks";

export default function HomeSearch() {

  const { direction, setDirection } = useDataContext()

  const navigation = useNavigation();
  const goToSearch = (dir) => {
    navigation.navigate("Scan");
    setDirection(dir)
  };
  return (
   
    <>
      <Pressable style={styles.inputBox} >
        <Text style={styles.inputText}>Where to</Text>

        <View style={styles.timeContainer}>
        
          <Entypo name={"location-pin"} size={20} />
        </View>
      </Pressable>
      <Pressable  onPress={()=>goToSearch('Start')} >
      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: "green"}]}>
        <FontAwesome name={"location-arrow"} size={16} color={"#ffffff"} />
        </View>

        <Text style={styles.destinationText} >START</Text>
      </View>
      </Pressable>
      <Pressable  onPress={()=>goToSearch('End')} className='mt-2' >
      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: "#285180"}]}>
          <FontAwesome name={"location-arrow"} size={16} color={"#ffffff"} />
        </View>

        <Text style={styles.destinationText}>END</Text>
      </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#b0b0b0",
    margin: 3,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6e6e6e",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 50,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: "#b3b3b3",
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "#b3b3b3",
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: 900,
    fontSize: 18,
  },
});
