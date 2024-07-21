import React from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {normalize} from "../../responsive/fontSize";
import {useTheme} from "../../providers/ThemeProvider";
import {MAIN_RED} from "../../constants/colors";

const SwitchButtons = ({left,right,onSwitch,switchValue}) => {
  const {isDarkTheme}=useTheme()
  return (
    <View style={{
      ...styles.themeBlock,
      // backgroundColor:"#d3d3d3",
    }}>

      <TouchableOpacity onPress={ ()=>{
        onSwitch(true)
      }} style={{
        backgroundColor: !switchValue?'transparent':MAIN_RED,
        elevation: !switchValue?0:5,
        ...styles.themeButton
      }}>
        <Text style={{...styles.themeText,color:!switchValue?"black":'white'}}>{left}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ ()=>{
        onSwitch(false)
      }} style={{
        backgroundColor: switchValue?'transparent':MAIN_RED,
        elevation: switchValue?0:5,
        ...styles.themeButton
      }}>

        <Text style={{...styles.themeText,color:switchValue?"black":'white'}}>{right}</Text>

      </TouchableOpacity>


    </View>
  );
};
const styles = StyleSheet.create({
  themeBlock:{
    alignItems: "center",
    flexDirection: "row",
    marginLeft: normalize(15),
    marginRight: normalize(15),
    borderRadius:10,
    backgroundColor:'white',
    padding:2
  },
  themeButton:{
    padding: normalize(5),
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 10
  },
  themeText:{
    marginLeft:normalize(10)
  }
})
export default SwitchButtons;
