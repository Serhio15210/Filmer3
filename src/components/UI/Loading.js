import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useTheme} from "../../providers/ThemeProvider";
import {MAIN_GREY} from "../../constants/colors";

const Loading = ({size='large'}) => {
  const {appTheme}=useTheme()
  return (
    <View style={{...styles.container, alignItems: 'center', justifyContent: 'center',backgroundColor:appTheme==='light'?'white':MAIN_GREY}}>
      <ActivityIndicator size={size} color={appTheme==='dark' ? "#DAA520" : "#DC143C"}/></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})
export default Loading;
