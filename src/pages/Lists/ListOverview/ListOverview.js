import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { normalize } from "../../../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../../../providers/ThemeProvider";
import { BLACK, MAIN_GREY_FADE } from "../../../constants/colors";
import { userApi } from "../../../services/UserService";
import { generateRandomColor } from "../../../styles/randomColors";
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FilmCard from "../../../components/Films/FilmCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MAIN_YELLOW } from "../../../constants";
import Feather from "react-native-vector-icons/Feather";

const ListOverview = ({ route }) => {
  const { id, title } = route.params;

  const { isDarkTheme, i18n } = useTheme();
  const { data, isLoading, isSuccess } = userApi.useGetListByIdQuery(id);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {

    navigation.setParams({ title: data?.list?.name });

  }, [data]);



  const cardWidth = Dimensions.get("window").width / 4;
  const [numColumns, setNumColumns] = useState(4);
  const animatedNumColumns = useSharedValue(cardWidth);
  const animatedOpacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedNumColumns.value),
      borderWidth: numColumns === 4 ? withTiming(animatedOpacity.value) : 0,
      borderBottomWidth: numColumns === 4 ? withTiming(animatedOpacity.value) : 1,
      alignSelf: numColumns === 1 ? "center" : "flex-start",
    };
  });
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: numColumns === 1 ? withTiming(animatedOpacity.value, {
        duration: 1000,
      }) : 0,

    };
  });
  const handleToggleColumns = () => {

    animatedNumColumns.value = numColumns === 4 ? (cardWidth * 4) - normalize(10) : cardWidth;
    animatedOpacity.value = numColumns === 4 ? 1 : 0;
    setNumColumns(numColumns === 4 ? 1 : 4);
  };
  return (
    isLoading ?
      <View style={{ ...styles.container, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={isDarkTheme ? "#DAA520" : "#DC143C"} /></View> :

      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.header__profile}>
            <View style={styles.avatar}>
              <Text style={styles.text}>{data?.list?.userId?.userName[0]?.toUpperCase()}</Text>
            </View>
            <Text style={styles.text}>{data?.list?.userId?.userName}</Text>
          </View>


            <Pressable onPress={handleToggleColumns}>
              {numColumns === 1 ? <Fontisto name={"microsoft"} color={"white"} size={20} /> :
                <SimpleLineIcons name={"menu"} color={"white"} size={20} />}
            </Pressable>


        </View>
        <View style={{ flex: 1 }}>
          <FlatList data={data?.list?.films}
                    maxToRenderPerBatch={3}
                    numColumns={numColumns}
                    key={numColumns}
                    keyExtractor={(item, index) => "key" + index}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: normalize(100), gap: 10 }}
                    renderItem={({ item, index }) => {
                      return <FilmCard item={item}   index={index} animatedStyle={animatedStyle}
                                       animatedOpacityStyle={animatedOpacityStyle} />;
                    }
                    } />

        </View>
        <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("EditList", { id: id })}>
          {/*<Ionicons name={"add"} color={"white"} size={30} />*/}
          <MaterialCommunityIcons name={"playlist-edit"} color={"white"} size={30} />
        </TouchableOpacity>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    // padding:normalize(20),
    // paddingTop:normalize(50),
    gap: 20,
  },
  avatar: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: generateRandomColor(),
    width: normalize(40),
    height: normalize(40),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(20),
  },
  header__profile: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingTop:10
  },
  text: {
    fontSize: 20, color: "white",
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
  addBlock: {
    flex: 1, alignItems: "center", justifyContent: "center",
  },
  betweenRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%",
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  delete: {
    backgroundColor: "#DC143C",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
    borderRadius: 10,
  },
  nameInput: {
    borderBottomWidth: 1, borderColor: MAIN_GREY_FADE, width: "50%", color: "black", margin: normalize(15),
  },
});
export default ListOverview;
