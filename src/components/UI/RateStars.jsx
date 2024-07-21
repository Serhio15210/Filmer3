import React from 'react';
import {View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {MAIN_RED} from "../../constants/colors";

const RateStars = ({rate,size=10,position="flex-start"}) => {
  const array = Array.from({length: rate}, (_, index) => index);
  return (<View style={{flexDirection: 'row', alignItems: 'center',justifyContent:position}}>
    {array.map((item, index) => {
      return <AntDesign name={'star'} color={MAIN_RED} key={index} size={size}/>
    })}


  </View>
  );
};

export default RateStars;
