import {BaseToast} from "react-native-toast-message";
import { BLACK, MAIN_RED } from "./colors";
import {normalize} from "../responsive/fontSize";
import {Text, View} from "react-native";
import React from "react";
import { MAIN_YELLOW_FADE } from "./index";

export const pushConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: MAIN_YELLOW_FADE,width:'90%',height:normalize(55),backgroundColor:BLACK }}
      contentContainerStyle={{ paddingHorizontal: 15 }}

      text1Style={{
        fontSize: 10,
        color:'white'
      }}
    />
  ),
  error:(props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: MAIN_RED,width:'90%',backgroundColor:BLACK }}
      contentContainerStyle={{ paddingHorizontal: 15 }}

      text1Style={{
        fontSize: normalize(14),
        color:'white'
      }}
    />
  ),


  tomatoToast: ({ text1, props }) => (
    <View style={{ width: '100%', backgroundColor: 'tomato' }}>
      <Text style={{fontSize:14}}>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};
