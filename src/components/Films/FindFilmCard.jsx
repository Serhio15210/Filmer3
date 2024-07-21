import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { IMG_URI } from "../../api/apiKey";
import unknown from "../../styles/unknown.png";
import { normalize } from "../../responsive/fontSize";
import { MAIN_GREY_SKELETON } from "../../constants/colors";
import React from "react";
import genres from "../../pages/Overview/Genres";
import { dataEng } from "../../constants/genres";
import AntDesign from "react-native-vector-icons/AntDesign";

const windowWidth = Dimensions.get("window").width;
const FindFilmCard = ({ item, index,onPress }) => {


  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card]}>
        <Image
          source={item?.poster_path?.length !== 0 && item?.poster_path !== null ? { uri: IMG_URI + item?.poster_path } : unknown}
          style={{ width: windowWidth / 4 }} resizeMode="cover" />
        <View style={[styles.info]}>
          <View style={styles.row}>
            <Text numberOfLines={4} style={{ color: "white" }}>{item?.title}</Text>
            <Text style={{ color: MAIN_GREY_SKELETON }}>{item?.release_date?.split("-")[0]}</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="star" size={20}
                       color={"#FFD700"} />
          <Text style={{ color: MAIN_GREY_SKELETON }}>{Math.round(item?.vote_average*10)/10}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    height: normalize(160),
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
    paddingBottom: 10,
    width: "100%",
  },
  info: {
    flex: 1, padding: 10,gap:10
  },
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
});

export default React.memo(FindFilmCard);
