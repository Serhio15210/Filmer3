import React, { useRef, useState } from "react";
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


import { DefaultStyles } from "../../../styles/defaultstyles";

import { IMG_URI } from "../../../api/apiKey";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AddFilmToListModal from "../../filmModals/AddFilmToListModal";

import { useAuth } from "../../../providers/AuthProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../../../providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { MAIN_GREY, MAIN_GREY_FADE, MAIN_GREY_SKELETON, MAIN_SUCCESS } from "../../../constants/colors";
import { useSelector } from "react-redux";
import AddFilmModal from "../../filmModals/AddFilmModal";
import { normalize } from "../../../responsive/fontSize";
import { themeColors } from "../themeColors";
import { userApi } from "../../../services/UserService";
import { SharedElement } from "react-navigation-shared-element";
import MenuListItem from "./MenuListItem";
import { useSharedValue } from "react-native-reanimated";

const MenuFilmsList = ({ data, name, isLoading }) => {
  const { isDarkTheme, screenTheme, i18n, appTheme } = useTheme();
  const navigation = useNavigation();
  const title = name;
  const style = styles(themeColors[appTheme]);
  const viewableItems=useSharedValue([])
  return (

    <View style={style.carouselContentContainer}>
      <View style={{ ...StyleSheet.absoluteFill, backgroundColor: themeColors[appTheme].backgroundColor }}>
        <View style={style.listTitle}>
          <Text numberOfLines={1} style={style.listTitleText}>{title}</Text>
          <TouchableOpacity style={{ justifyContent: "center" }}
                            onPress={() => navigation.navigate("MenuFullList", { data: data, title: title })}>
            <Text style={style.viewAll}>{i18n.t("seeAll")}</Text></TouchableOpacity>
        </View>
        {isLoading ?
          <View style={{
            flex: 1,
            justifyContent: "center",
          }}>
            <ActivityIndicator size="large" color={style.loadColor} /></View> :
          <View style={style.carouselContainerView}>
            <FlatList
              horizontal={true}
              data={data}
              rowWrapperStyle={{ justifyContent: "space-between" }}
              keyExtractor={(item, index) => `key-${index}`}
              removeClippedSubviews={true}

              // snapToInterval={normalize(200)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap:15}}
              onViewableItemsChanged={({viewableItems:vItems})=>{
                viewableItems.value=vItems

              }}
              renderItem={({item,index})=><MenuListItem item={item} index={index} vItems={viewableItems}/>}
            />
          </View>}
      </View>
    </View>
  );
};
export const styles = (theme) => StyleSheet.create({
  carouselContentContainer: {
    flex: 1,
    backgroundColor: "#000",
    height: normalize(320),
    paddingHorizontal: normalize(15),

  },
  listTitle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(10),
    paddingBottom: 0,
    width: "100%",
  },
  listTitleText: {
    color: theme.textColor, fontSize: normalize(24), fontWeight: "bold", marginLeft: normalize(0), marginVertical: 10,
    fontFamily: "Kanit-Black",

  },
  viewAll: {
    color: theme.textColor, fontSize: normalize(14),
    fontWeight: "normal",
  },
  carouselContainerView: {
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalize(10),

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
  carouselImage: {
    width: "100%",
    // width: "100%",
    height: normalize(223),
    // height: normalize(230),
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,2)",
  },
  buttonsRow: {
    position: "absolute",
    top: 0,
    height: normalize(57),
    flexDirection: "row",
    gap:10,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  gradientHeader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
  },
});
export default MenuFilmsList;
