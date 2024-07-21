import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../providers/ThemeProvider";

import { useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import { normalize } from "../../responsive/fontSize";
import { MAIN_GREY_SKELETON, MAIN_RED } from "../../constants/colors";
import { IMG_URI } from "../../api/apiKey";
import unknown from "../../styles/unknown.png";
import { themeColors } from "./themeColors";
import { useAddToListMutation } from "../../services/UserService";

const AddFilmToListModal = ({ open, setOpen, film }) => {
  const {
    userList,
  } = useSelector((state) => state.auth);
  const { i18n, appTheme } = useTheme();
  const styles = style(themeColors[appTheme]);
  const [addToList, { isLoading: isAdding, isSuccess: isAdded, error }] = useAddToListMutation();

  const ifFilmWasAddedToList = (listId) => {
    const id = film.id || film.imdb_id;

    return userList.filter(list => list._id === listId)[0].films.filter(item => item.imdb_id === id + "").length === 0
  };
  // useEffect(() => {
  //
  //   if (isAdded) {
  //     setOpen(false);
  //   }
  // }, [isAdded]);

  return (
    <ModalContainer open={open} setOpen={setOpen} position={"flex-end"} padding={0} type={"fade"}>

      <View style={styles.container}>
        <View style={{ ...styles.block, ...styles.header }}>
          <Text style={styles.title}>{i18n.t("addTo")}</Text>
          <Pressable onPress={() => setOpen(false)}>
            <MaterialIcons name="close" size={30} color={themeColors[appTheme].titleColor} />
          </Pressable>

        </View>
        <FlatList horizontal={false} showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ padding: normalize(15)}}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={1}
                  data={userList}
                  renderItem={({ item, index }) => {
                    return (
                      <Pressable disabled={!ifFilmWasAddedToList(item?._id)} key={index}
                                        style={styles.list} onPress={() => {
                        addToList({ listId: item?._id, film });
                      }}>
                        {!ifFilmWasAddedToList(item?._id) && <View
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            // backgroundColor:'rgba(0, 0, 0, 0.3)',
                            borderRadius: 10, zIndex: 5,
                          }} />}
                        <View>
                          <Text style={{ ...styles.title }} numberOfLines={1} adjustsFontSizeToFit>{item?.name}</Text>
                          <Text style={{ ...styles.greyText }} numberOfLines={1}
                                adjustsFontSizeToFit>{item?.films.length} films</Text>
                        </View>
                        {!ifFilmWasAddedToList(item?._id)?<MaterialIcons name="check" size={30} color={themeColors[appTheme].buttonBg} />:
                        isAdding?<ActivityIndicator size={normalize(20)} color={"#DAA520"}/>:<></>}

                      </Pressable>
                    );
                  }} />


      </View>

    </ModalContainer>
  );
};
const style = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: theme.backgroundColor,
    // padding: normalize(15),
    borderRadius: 10,
    height: "100%",


  },
  block: {
    width: "100%",
    // borderBottomWidth: 1,
    // borderColor: 'rgb(210, 210, 210)',
    marginBottom: normalize(20),

    padding: normalize(15),
  },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.buttonBg,
  },
  title: {
    color: theme.titleColor, fontWeight: "700", fontSize: normalize(20),
  },
  greyText: {
    color: MAIN_GREY_SKELETON, fontSize: normalize(16),
  },
  input: {
    color: theme.titleColor, minHeight: normalize(100),
  },
  button: {
    width: "100%",
    backgroundColor: MAIN_RED,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: normalize(20),
  },
  buttonText: {
    color: "white", fontSize: normalize(18),
  },
  wrap: {
    flexDirection: "column", gap: 10,
  },
  filmsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: normalize(160),

    minHeight: normalize(170),
    maxHeight: normalize(250),
    margin: normalize(5),

  },
  list: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderColor: "rgb(210, 210, 210)",
    paddingBottom: 10,
  },
  img1: {
    width: normalize(110),
    height: normalize(160),
    position: "absolute",
    left: 0,
    zIndex: 3,
    borderRadius: 10,
  },
  img2: {
    width: normalize(100),
    height: normalize(150),
    position: "absolute",
    left: normalize(40),
    zIndex: 2,
    borderRadius: 10,
  },
  img3: {
    width: normalize(90),
    height: normalize(140),
    position: "absolute",
    left: normalize(70),
    zIndex: 1,
    borderRadius: 10,
  },
});
export default AddFilmToListModal;
