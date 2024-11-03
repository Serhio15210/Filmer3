import {
  ActivityIndicator,
  BackHandler, Dimensions,
  FlatList,
  Pressable, ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BLACK, MAIN_GREY_SKELETON } from "../../../constants/colors";
import { userApi } from "../../../services/UserService";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { normalize } from "../../../responsive/fontSize";
import React, { useEffect, useState } from "react";
import { MAIN_YELLOW } from "../../../constants";
import { Formik } from "formik";
import { useTheme } from "../../../providers/ThemeProvider";
import FilmCard from "../../../components/Films/FilmCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { setTempFilms } from "../../../redux/listReducer";
import LinearGradient from "react-native-linear-gradient";
import AlertModal from "../../../components/filmModals/AlertModal";

const EditList = ({ route }) => {
  const { id, title } = route.params;
  const { data, isLoading } = userApi.useGetListByIdQuery(id);
  const [editList, { isLoading: isUpdating, isSuccess, error }] = userApi.useUpdateListMutation();
  const [deleteList, { isLoading: isDeleting, isSuccess:isDeleted  }] = userApi.useDeleteListMutation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { screenTheme, isDarkTheme, i18n } = useTheme();
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const {
    tempFilms,
  } = useSelector((state) => state?.list);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(data?.list?.mode || "public");
  const modes = {
    public: "public",
    friends: "friends",
    private: "private",
  };
  const modeColors = {
    true: MAIN_YELLOW,
    false: MAIN_GREY_SKELETON,
  };
  useEffect(() => {

    dispatch(setTempFilms(data?.list?.films));
  }, [data]);
  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
    if (isDeleted){
      navigation.pop(2)
    }
  }, [isSuccess,isDeleted]);

  function handleBackButtonClick() {
    setShowAlert(true);
    return true;
  }

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }

  }, [isFocused]);
  return (
    <ScrollView>


      <View style={styles.container}>
        <StatusBar backgroundColor={MAIN_YELLOW} />
        {showAlert &&
          <AlertModal open={showAlert} setOpen={setShowAlert} title={"Are you sure?"} text={"Changes will be lost"}
                      onCancel={() => setShowAlert(false)} onDiscard={() => {
            setShowAlert(false);
            navigation.goBack();
          }} />}

        <AlertModal open={showDeleteAlert} setOpen={setShowDeleteAlert} title={"Delete list"}
                    text={"Are you sure you want to delete this list"}
                    discardText={"Delete"}
                    onCancel={() => setShowDeleteAlert(false)}
                    onDiscard={() => {
                      deleteList(id)
                    }} />
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ name: data?.list?.name, description: data?.list?.description }}
            onSubmit={async values => {
              const array = tempFilms.map(item => item._id);
              await editList({ id: id, name: values.name, description: values.description, mode: mode, films: array });
              dispatch(setTempFilms([]));
            }}

          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => setShowAlert(true)}>
                    <AntDesign name={"close"} size={20} color={"white"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSubmit}>
                    {isUpdating ? <ActivityIndicator size="small" color={"white"} /> :
                      <AntDesign name={"check"} size={20} color={"white"} />}
                  </TouchableOpacity>
                </View>

                <View style={styles.form}>
                  <View style={{ gap: -10 }}>
                    <Text style={{ color: isDarkTheme ? MAIN_GREY_SKELETON : "black" }}>List Name</Text>
                    <TextInput style={{ ...styles.input, borderColor: values.name ? "white" : MAIN_GREY_SKELETON }}
                               placeholder={"..."}
                               placeholderTextColor={isDarkTheme ? MAIN_GREY_SKELETON : "black"}
                               value={values.name}
                               onBlur={handleBlur("name")}
                               onChangeText={handleChange("name")} />
                  </View>
                  <View style={{ gap: -10 }}>
                    <Text style={{ color: isDarkTheme ? MAIN_GREY_SKELETON : "black" }}>Description</Text>
                    <TextInput
                      style={{ ...styles.input, borderColor: values.description ? "white" : MAIN_GREY_SKELETON }}
                      placeholder={"..."}
                      placeholderTextColor={isDarkTheme ? MAIN_GREY_SKELETON : "black"}
                      value={values.description}
                      onBlur={handleBlur("description")}
                      onChangeText={handleChange("description")} multiline />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
          navigation.navigate("EditEntries");
        }}>
          <LinearGradient
            colors={["transparent", BLACK]}
            style={styles.gradient}>
          </LinearGradient>
          <Text style={{ ...styles.text, padding: normalize(10) }}>Edit Entries...</Text>
          <FlatList data={tempFilms}
                    maxToRenderPerBatch={3}
                    numColumns={4}
                    keyExtractor={(item) => item.imdb_id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return <FilmCard item={item} key={item?._id} index={index} />;
                    }
                    } />

        </TouchableOpacity>
        <View style={styles.modeRow}>
          <Pressable onPress={() => setMode(modes.public)} style={styles.modeButton}>
            <MaterialIcons name={"public"} color={modeColors[mode === modes.public]} size={30} />
            <Text style={{ ...styles.text, color: modeColors[mode === modes.public] }}>Public</Text>
          </Pressable>
          <Pressable onPress={() => setMode(modes.friends)} style={styles.modeButton}>
            <FontAwesome5 name={"user-friends"} color={modeColors[mode === modes.friends]}
                          size={30} />
            <Text style={{ ...styles.text, color: modeColors[mode === modes.friends] }}>Friends only</Text>
          </Pressable>
          <Pressable onPress={() => setMode(modes.private)} style={styles.modeButton}>
            <FontAwesome5 name={"lock"} color={modeColors[mode === modes.private]} size={30} />
            <Text style={{ ...styles.text, color: modeColors[mode === modes.private] }}>Private</Text>
          </Pressable>
        </View>

      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.delete} onPress={() => setShowDeleteAlert(true)}>

        <AntDesign
          name="delete"
          size={20}
          color={"white"} />

        <Text style={styles.text}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    height: Dimensions.get("window").height,
    // padding: normalize(20),

  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: MAIN_YELLOW,
    padding: normalize(20),
  },
  formContainer: {
    gap: 10,
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,

  },
  form: {
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(10),
    gap: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
  },
  text: {
    color: "white", fontSize: normalize(18),
  },
  gradient: {
    flex: 1,
    position: "absolute", width: "100%", height: "100%", zIndex: 2,
  },
  modeRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%",
    padding: normalize(20),
    borderTopWidth: 1,

    height: normalize(100),
    borderColor: MAIN_GREY_SKELETON,
  },
  modeButton: {
    alignItems: "center",
  },
  delete: {
    height: normalize(100),
    width: "100%",
    backgroundColor: MAIN_YELLOW,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
export default EditList;
