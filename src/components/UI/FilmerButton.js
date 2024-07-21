import React from 'react';
import {MAIN_RED} from "../../constants/colors";
import {normalize} from "../../responsive/fontSize";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { MAIN_YELLOW } from "../../constants";

const FilmerButton = ({text,onPress,style}) => {
  const {isDarkTheme} = useTheme()
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.button,backgroundColor:isDarkTheme?MAIN_YELLOW:MAIN_RED,...style}}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button:{
    flex:1,
    backgroundColor:MAIN_RED,alignItems:'center',justifyContent:'center',width:'100%',borderRadius:10,padding:normalize(15),
    maxHeight:normalize(50)
  },
  text:{
    color:'white',fontSize:normalize(18)
  }
})
export default FilmerButton;
