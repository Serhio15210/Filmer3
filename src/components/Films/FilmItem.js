/* eslint-disable */
import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useTheme } from "../../providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import unknown from "../../styles/unknown.png";
import { IMG_URI } from "../../api/apiKey";
import { MAIN_GREY_FADE } from "../../constants/colors";
import Swipable from "react-native-gesture-handler/Swipeable";
import { normalize } from "../../responsive/fontSize";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteFilm } from "../../api/auth";
import { setUser } from "../../redux/authReducer";

const FilmItem = ({item, isSerial, closeRow, index, row, leftAction, swipeAction, onRatePress,onPress}) => {
  const {isDarkTheme, screenTheme} = useTheme()
  const navigation = useNavigation()
  const theme = screenTheme
  const [isEdit, setIsEdit] = useState(false)
  const [openRateFilm, setOpenRateModal] = useState(false)
  const {
    user, refresh
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const isFavorite = !!user?.favoriteFilms?.find(item => item?.imdb_id === item?.imdb_id)
  const changeFilm = (item) => {
    if (isFavorite) {
      // dispatch(setUser({
      //   ...user,
      //   favoriteFilms: user?.favoriteFilms?.filter(item => item?.imdb_id !== id)
      // }))
      deleteFavoriteFilm(item?.id).then(res => {

        if (res?.success) {
          // getUserInfo()
          dispatch(setUser({
            ...user,
            favoriteFilms: user?.favoriteFilms?.filter(item => item?.imdb_id !== item?.imdb_id)
          }))
        }
      })
    } else {
      // dispatch(setUser({
      //   ...user,
      //   favoriteFilms: user?.favoriteFilms?.concat([{imdb_id:id}])
      // }))
      setOpenRateModal(true)
    }
  }

  return (
    <>
      {/*{openRateFilm &&*/}
      {/*  <AddFilmModal setOpen={setOpenRateModal} open={openRateFilm} selectFilm={item} changeUser={changeFilm}/>}*/}

      <Swipable ref={ref => row[index] = ref} renderLeftActions={leftAction} useNativeAnimations={true}
                overshootLeft={false} onSwipeableOpen={() => {
        swipeAction(item)
        closeRow(index)
      }} onSwipeableWillOpen={() => {

        closeRow(index)
      }}>
        <Pressable style={styles.block} onPress={onPress}>
          <Image
            source={item?.poster?.length !== 0 && item?.poster !== null ? {uri: IMG_URI + item.poster} : unknown}
            style={styles.img} resizeMode="cover"/>

          <View style={{flex:1, paddingHorizontal: normalize(15),width:'100%'}}>

            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>{item.title}</Text>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.row} onPress={onRatePress}>
                <AntDesign name="star" size={30} style={{marginRight: normalize(15)}}
                           color={item?.rate > 0 ? "#FFD700" : MAIN_GREY_FADE}/>
                <Text
                  style={styles.rate}>{`${item?.rates[0]?.rate}/5`}</Text>
              </TouchableOpacity>
            </View>


          </View>

          {/*{item?.comment && <FontAwesome name="commenting" size={20}*/}
          {/*                               color={isDarkTheme ? "#DAA520" : "#DC143C" }*/}
          {/*                               style={styles.comment}*/}
          {/*/>}*/}

          {/*<TouchableOpacity onPress={(e) => {*/}
          {/*  e.stopPropagation()*/}
          {/*  item?.rate<= 0&&changeFilm()*/}
          {/*}*/}
          {/*} style={styles.like}>*/}

          {/*  <AntDesign name="heart" size={30} color={isFavorite ? MAIN_SUCCESS : MAIN_GREY_FADE}*/}
          {/*             style={{alignSelf: 'center'}}/>*/}
          {/*</TouchableOpacity>*/}


        </Pressable>
      </Swipable>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    width: Dimensions.get('window').width - 30,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4,
    marginBottom: normalize(20),
    marginHorizontal: normalize(5),
    // paddingRight:normalize(15),
    maxHeight:normalize(150),
    borderRadius: 10
  },
  img: {
    width: normalize(100),
    height: normalize(150),
    alignSelf: "flex-start",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    maxWidth: normalize(250),

    textAlign: 'left',
    marginBottom: 5,
    width: '100%',

  },
  row: {
    display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center'
  },
  rate: {
    color: "black", fontSize: normalize(16)
  },
  comment: {
    position: 'absolute', right: normalize(5), top: normalize(5)
  },
  like: {
    backgroundColor: 'white',
    elevation: 4,
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 10
  }
})
export default FilmItem;
