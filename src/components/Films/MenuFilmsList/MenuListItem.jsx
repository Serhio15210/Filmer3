import React from "react";
import { normalize } from "../../../responsive/fontSize";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IMG_URI } from "../../../api/apiKey";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../themeColors";
import { MAIN_GREY_SKELETON } from "../../../constants/colors";
import { useTheme } from "../../../providers/ThemeProvider";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
const MenuListItem = ({ item, index,vItems }) => {
  const { appTheme } = useTheme();
  const navigation = useNavigation();
  const style = styles(themeColors[appTheme]);

  const rStyle=useAnimatedStyle(()=>{
    const isVisible=Boolean(
      vItems.value?.filter(item=>item.isViewable).find(viewItem=>viewItem?.item.id===item.id)
    )
    return{
      opacity:withTiming(isVisible?1:0),
      transform:[{
        scale:withTiming(isVisible?1:0)
      }]
    }
  })
  return (
    <Animated.View key={index}  style={[{width:normalize(150),height:normalize(300)},rStyle ]}>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          navigation.navigate("FilmOverview", {
            // fromTitle: title,
            item: item,
            id: item.id,
            title: item.title });
        }
        }
      >
        <Image source={{ uri: IMG_URI + item.poster_path }} style={style.carouselImage} resizeMode="contain" />
        <Text style={style.carouselText}   numberOfLines={1}>{item.title}</Text>
        <Text style={style.greyText}   numberOfLines={1}>{item.release_date?.split('-')[0]} ● {Math.round(item?.vote_average*10)/10}/10</Text>
      </Pressable>

    </Animated.View>
  );
};
export const styles = (theme) => StyleSheet.create({
  carouselImage: {
    width: "100%",
    // width: "100%",
    height: normalize(223),
    // height: normalize(230),
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,2)",
  },
  carouselText: {
    fontSize:normalize(16),
    color: "white",
    width: normalize(150),
    fontWeight: "bold",
    alignSelf: "center",
  },
  greyText:{
    fontSize:normalize(12),
    color:MAIN_GREY_SKELETON
  },
  loadColor: theme.loadColor,

});
export default React.memo(MenuListItem);
