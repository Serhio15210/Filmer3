import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import Swipable from "react-native-gesture-handler/Swipeable";
import { IMG_URI } from "../../../api/apiKey";
import unknown from "../../../styles/unknown.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { BLACK, MAIN_GREY_SKELETON } from "../../../constants/colors";
import { MAIN_GREY, MAIN_YELLOW } from "../../../constants";
import { normalize } from "../../../responsive/fontSize";
const windowWidth = Dimensions.get("window").width;
const leftAction = (progress, dragX) => {
 const scale = dragX.interpolate({
  inputRange: [0, 100],
  outputRange: [0, 1],
  extrapolate: "clamp",
 });
 return (
   <View style={styles.delete}>
    <Animated.Text style={{ color: "white", marginLeft: normalize(30), transform: [{ scale }] }}>
     <AntDesign
      name="delete"
      size={30}
      color={"white"} /></Animated.Text>
   </View>
 );
};
const EditFilmCard = ({ item,getIndex, drag, isActive,closeRow,deleteItem,row }) => {
 const rate = Array.from({ length: item?.rates[0]?.rate }, (_, index) => index + 1);
 const index=getIndex()
 return (

    <ScaleDecorator activeScale={1.05} key={getIndex()}>
     <Swipable ref={ref => row[index] = ref} renderLeftActions={leftAction} useNativeAnimations={true}
               overshootLeft={false} onSwipeableOpen={() => {
      deleteItem(item)
      closeRow(index)
     }} onSwipeableWillOpen={() => {

      closeRow(index)

     }}>
      <View

        style={[
         styles.card,

        ]}
      >
       <View style={styles.indexCircle}>
        <Text style={{fontSize:10,color:'white'}}>{index+1}</Text>
       </View>
       <Image
         source={item?.poster?.length !== 0 && item?.poster !== null ? { uri: IMG_URI + item.poster } : unknown}
         style={{ width: windowWidth / 4 }} resizeMode="contain" />
       <View style={[styles.info]}>
        <View style={styles.row}>
         <Text numberOfLines={4}>{item?.title}
         </Text>

        </View>
        <View style={{ ...styles.row, gap: 0 }}>
         {rate?.map((item) => (
           <AntDesign name="star" size={20}
                      color={"#FFD700"} />
         ))}
        </View>
       </View>
       <TouchableOpacity onLongPress={drag}
                         disabled={isActive}
                         activeOpacity={0.7} style={styles.drag} hitSlop={20}>
        <SimpleLineIcons name={"menu"} color={MAIN_GREY_SKELETON} size={20} />
       </TouchableOpacity>

      </View>
     </Swipable>
    </ScaleDecorator>


 );
};
const styles = StyleSheet.create({

 card: {
  flexDirection: "row",
  gap: 10,
  height: normalize(150),
  backgroundColor: BLACK,
  borderBottomWidth: 1,
  borderColor: MAIN_GREY_SKELETON,
  padding: 10,
  width: "100%",
 },
 info: {
  flex: 1, paddingVertical: 10,
 },
 row: { flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
 indexCircle:{
  position: "absolute",
  top: 0,
  left: 10,
  width: 20,
  height: 20,
  backgroundColor: MAIN_GREY,
  zIndex: 3,
  borderRadius: 100,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:2,
  borderColor:BLACK
 },
 delete: {
  backgroundColor: MAIN_YELLOW,
  justifyContent: 'center',
  width: '100%',
 },
 drag:{
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
 }
});
export default React.memo(EditFilmCard);
