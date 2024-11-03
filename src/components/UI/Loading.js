import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useTheme} from "../../providers/ThemeProvider";
import { BLACK, MAIN_GREY, MAIN_YELLOW } from "../../constants/colors";

const Loading = ({size='large',color=MAIN_YELLOW}) => {
  const {appTheme}=useTheme()
  return (
    <View style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={size} color={color}/></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})
export default Loading;
