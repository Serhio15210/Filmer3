import { Dimensions, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { MAIN_GREY, MAIN_YELLOW } from "../../../constants";
import React, { useEffect, useMemo, useState } from "react";
import { BLACK, MAIN_GREY_SKELETON, MAIN_RED } from "../../../constants/colors";
import { normalize } from "../../../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { setTempFilms } from "../../../redux/listReducer";
// import Animated from "react-native-reanimated";
import EditFilmCard from "../../../components/UserLists/EditList/EditFilmCard";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FindFilmModal from "../../../components/filmModals/FindFilmModal";


const EditEntries = () => {
  const {
    tempFilms,
  } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  let row = [];
  let swipe;
  const navigation = useNavigation();
  const [films, setFilms] = useState([]);
  const [isAddFilm, setIsAddFilm] = useState(false);
  useEffect(() => {
    setFilms(tempFilms);
  }, [tempFilms]);
  const closeRow = (index) => {
    if (swipe && swipe !== row[index]) {
      swipe.close();
    }
    swipe = row[index];
  };
  const deleteItem = (item) => {
    const data = films.filter(film => film?.imdb_id !== item.imdb_id);
    setFilms(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={MAIN_YELLOW} />
      {isAddFilm &&
        <FindFilmModal setOpen={setIsAddFilm} open={isAddFilm}   listData={films} />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <AntDesign name={"close"} size={20} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(setTempFilms(films));
          navigation.goBack();
        }}>
          <AntDesign name={"check"} size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={films}
        onDragEnd={({ data }) => {
          setFilms(data);
        }}
        keyExtractor={(item) => item.imdb_id}
        renderItem={(props) => <EditFilmCard key={props.item?.imdb_id} {...props} deleteItem={deleteItem} row={row} closeRow={closeRow} />}
        contentContainerStyle={{ gap: 10, paddingBottom: Dimensions.get("window").height/5 }}
      />
      <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("FindFilmToList")}>
        <Ionicons name={"add"} color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    // padding: normalize(20),

  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: MAIN_YELLOW,
    padding: normalize(20),
  },
  add: {
    backgroundColor: MAIN_YELLOW,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: normalize(60),
    height: normalize(60),
    position: "absolute",
    right: normalize(15),
    bottom: normalize(15),
  },
});
export default EditEntries;
