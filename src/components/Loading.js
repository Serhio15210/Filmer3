import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useTheme} from "../providers/ThemeProvider";

const Loading = ({size='large',color}) => {
  const {isDarkTheme}=useTheme()
  return (
    <View style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={size} color={color||(isDarkTheme ? "#DAA520" : "#DC143C")}/></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})
export default Loading;
