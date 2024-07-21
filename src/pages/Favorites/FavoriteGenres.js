import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../../responsive/fontSize";
import { data, dataEng } from "../../constants/genres";
import { BLACK, MAIN_GREY, MAIN_GREY_SKELETON, MAIN_RED, WHITE } from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../../providers/ThemeProvider";
import Animated, {
  Extrapolate,
  interpolate, interpolateColor,
  useAnimatedStyle,
  useSharedValue, withSpring,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-snap-carousel";
import { themeColors } from "../Auth/themeColors";
import LinearGradient from "react-native-linear-gradient";
import { MAIN_GREY_FADE, MAIN_YELLOW, MAIN_YELLOW_FADE } from "../../constants";
import AwesomeButton from "react-native-really-awesome-button";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width: windowWidth } = Dimensions.get("window");
const CardItemWidth = windowWidth / 3;
const FavoriteGenres = () => {
  const contentOffset = useSharedValue(0);
  const scale = useSharedValue(0);
  const [selectGenre, setSelectGenre] = useState([]);
  const { i18n, appTheme, locale } = useTheme();
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: scale.value,
      }],
    };
  });
  useEffect(() => {
    scale.value = withSpring(1, {
      duration: 800,
    });
  }, []);
  const isChosen=(id)=>{
    return selectGenre?.filter(item=>item===id).length>0
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("chooseFavoriteGenres")}:</Text>
      <View style={{ width: "100%", alignItems: "center",flex:1 }}>
        <Animated.View style={[rStyle]}>
          <Carousel
            loop={false}
            width={windowWidth}
            firstItem={dataEng.length / 2}
            autoPlay={true}
            contentContainerCustomStyle={{ paddingTop: 30, justifyContent: "center",alignItems:'center' }}
            data={dataEng}
            scrollAnimationDuration={1000}


            renderItem={({ item, index }) => {
              const chosen=isChosen(item.id)
            return  <Card item={item} index={index} isChosen={chosen} selectGenre={selectGenre} setSelectGenre={setSelectGenre} />
            }

            }
            sliderWidth={windowWidth}
            itemWidth={normalize(250)}
          />
        </Animated.View>
        <LinearGradient
          colors={["transparent", MAIN_GREY_SKELETON, MAIN_GREY_FADE, MAIN_GREY_FADE, MAIN_GREY_SKELETON, "transparent"]}
          style={{
            // backgroundColor: MAIN_GREY_SKELETON,

            width: windowWidth,
            height: "100%",
            // transform: [{ rotateX: "60deg" }],
            position: "absolute",
            bottom: 0,
            zIndex: -1,
          }}>
        </LinearGradient>
      </View>

      <AwesomeButton
        progress

        style={{alignSelf: 'center', marginBottom: normalize(10)}}
        width={Dimensions.get('window').width - 30}
        backgroundColor={MAIN_YELLOW}
        borderRadius={10}
        backgroundDarker={'white'}
      >
        {i18n.t('add')}
      </AwesomeButton>
    </View>
  );
};
const Card = ({ item, index,isChosen,selectGenre,setSelectGenre }) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [BLACK, MAIN_YELLOW]
      ),
    };
  });
  return (
    <AnimatedPressable style={[
      styles.genre,
      {backgroundColor: isChosen?MAIN_YELLOW:BLACK}, animatedStyle
      // {width: CardItemWidth,aspectRatio:1},
      // rStyle
    ]} onPress={()=>{
      if(isChosen){
        setSelectGenre((prev)=>selectGenre.filter(g=>g!==item.id))
      }else setSelectGenre(selectGenre.concat([item.id]))
      progress.value = withTiming(1 - progress.value, { duration: 300 });
    }}>
      <Image source={item.picture} style={styles.picture}
             resizeMode={"cover"}
      />
      <View style={{ backgroundColor: !isChosen?MAIN_YELLOW:BLACK, width: "50%", height: 2, borderRadius: 100 }} />
      <Text style={styles.genreText}>{item.name}</Text>
    </AnimatedPressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    padding: normalize(15),
    alignItems: "center",
    justifyContent:'space-between'
    // justifyContent: "center",
  },
  block: {
    flex: 1,
    width: "100%",
    marginTop: normalize(10),
    justifyContent: "center",
    alignItems: "center",
  },
  flat: {
    // paddingHorizontal: normalize(3),
    // paddingBottom: normalize(80),
    // paddingTop: normalize(30),
    //
    // backgroundColor:'red',
    // width:'100%',
    // alignSelf:'center'
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white", fontSize: normalize(24), fontWeight: "600",
  },
  genre: {
    // elevation: 3,

    width: normalize(250),
    backgroundColor: BLACK,
    // marginBottom: normalize(10),
    borderRadius: 10,
    height: normalize(350),
    padding: 10,
    alignItems: "center",
    gap: 20,
  },
  picture: {
    width: "100%",
    height: normalize(250),
    borderRadius: 10,

  },
  genreText: {
    color: "white",
    textAlign: "center",
    fontSize: normalize(18),
    flex: 1,
    flexWrap: "wrap",
  },
  nextButton: {
    backgroundColor: MAIN_RED,
    width: normalize(60),
    height: normalize(60),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: normalize(30),
    right: normalize(30),
  },
});

export default FavoriteGenres;
