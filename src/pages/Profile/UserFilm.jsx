import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import {normalize} from "../../responsive/fontSize";
import {IMG_URI, UNKNOWN_IMG} from "../../api/apiKey";
import {AirbnbRating} from "react-native-ratings";
import {MAIN_GREY, MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";

const UserFilm = ({item,onPress}) => {
  return (
    <TouchableOpacity
      style={{width: Dimensions.get('window').width/3-15, marginRight: normalize(10), marginBottom: normalize(10)}} onPress={onPress}>
      <Image source={item?.poster ? {uri: IMG_URI + item?.poster} : UNKNOWN_IMG} style={styles.activityImg}/>
      {item?.rate > 0 && <AirbnbRating
        count={5}
        defaultRating={item?.rate}
        showRating={false}
        isDisabled={true}
        size={normalize(15)}
        selectedColor={MAIN_RED}
        ratingContainerStyle={{marginTop: 0, width: normalize(120)}}

      />}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  activityImg: {
    width: '100%', height: normalize(150), borderRadius: 5
  },


})
export default UserFilm;
