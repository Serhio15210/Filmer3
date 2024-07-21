import React from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import { Image, Text, TouchableOpacity } from "react-native";
import { IMG_URI, UNKNOWN_IMG } from "../../../api/apiKey";
import { normalize } from "../../../responsive/fontSize";
import { themeColors } from "../themeColors";
import { MAIN_GREY_SKELETON } from "../../../constants/colors";

const RenderSimilarItem = ({item, isSerial, navigation}) => {
  const {screenTheme} = useTheme()
  const {i18n,appTheme} = useTheme();
  const details = screenTheme;
  return (
    <TouchableOpacity key={item.id} style={{width: normalize(150)}}
                      onPress={() => navigation.push(isSerial ? "SerialOverview" : "FilmOverview", {
                        id: item.id,
                        title: isSerial ? item.name : item.title
                      })}>
      <Image source={item?.poster_path?{uri: IMG_URI + item?.poster_path}:UNKNOWN_IMG}
                       style={{
                         height: normalize(223),
                         width: "100%",
                          borderRadius:10,
                         //
                         // backgroundPositionX: "50%",
                         // backgroundPositionY: "50%",
                       }}  resizeMode={'cover'}>

      </Image>

      <Text style={{
        color: themeColors[appTheme].titleColor,
        fontSize: normalize(16),

      }} numberOfLines={1} >{isSerial ? item.name : item.title}</Text>
      <Text style={{
        color: MAIN_GREY_SKELETON,
        fontSize: normalize(12),
      }}   numberOfLines={1}>{item.release_date?.split('-')[0]} ● {Math.round(item?.vote_average*10)/10}/10</Text>

    </TouchableOpacity>
  );
};

export default RenderSimilarItem;
