import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IMG_URI } from "../../api/apiKey";
import unknown from "../../styles/unknown.png";
import { normalize } from "../../responsive/fontSize";
import Animated from "react-native-reanimated";
import { MAIN_GREY_SKELETON, MAIN_SUCCESS } from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const FilmCard = ({ item, index, animatedStyle={}, animatedOpacityStyle={} }) => {
  const rate = Array.from({ length: item?.rates[0]?.rate }, (_, index) => index + 1);
  const navigation=useNavigation()
  return (
    <Pressable onPress={()=>{
      navigation.navigate("FilmOverview", {
        item: item,
        id: item.imdb_id,
        title: item.title });
    }}>
    <Animated.View style={[styles.card, animatedStyle]}>

      <Image
        source={item?.poster?.length !== 0 && item?.poster !== null ? { uri: IMG_URI + item.poster } : unknown}
        style={{ width: windowWidth / 4 }} resizeMode="cover" />
      <Animated.View style={[styles.info, animatedOpacityStyle]}>
        <View style={styles.row}>
          <Text numberOfLines={4}>{item?.title}
          </Text>
          {item?.isFavorites?.length > 0 && <AntDesign name="heart" size={normalize(20)} color={MAIN_SUCCESS} />}
        </View>
        <View style={{ ...styles.row, gap: 0 }}>
          {rate?.map((item) => (
            <AntDesign name="star" size={20}
                       color={"#FFD700"} />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    height: normalize(160),

    borderColor: MAIN_GREY_SKELETON,
    paddingBottom: 10,
    width: windowWidth / 4,
  },
  info: {
    flex: 1, padding: 10,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
});
export default React.memo(FilmCard);
