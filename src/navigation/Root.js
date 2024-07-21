import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FilmOverview from "../pages/Overview/filmOverview/FilmOverview";
import { Drawer } from "./DrawerMain";
import { themeColors } from "./themeColors";
import { useTheme } from "../providers/ThemeProvider";
import FavoriteListOverview from "../pages/Lists/FavoriteListOverview";
import AddList from "../pages/Lists/AddList/AddList";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import ListOverview from "../pages/Lists/ListOverview/ListOverview";
import FavoriteGenres from "../pages/Favorites/FavoriteGenres";
import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { normalize } from "../responsive/fontSize";
import { useSelector } from "react-redux";
import EditList from "../pages/Lists/EditList/EditList";
import EditEntries from "../pages/Lists/EditList/EditEntries";
import FindFilmToList from "../pages/Lists/EditList/FindFilmToList";
import AddFilmToList from "../pages/Lists/EditList/AddFilmToList";
import ProfileStack from "./ProfileStack";
import FilmReviews from "../pages/Overview/FilmReviews";


const Stack = createSharedElementStackNavigator();
export const Root = ({ navigation }) => {

  const { i18n, appTheme } = useTheme();
  // const {
  //   user,
  // } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator initialRouteName={"HomeRoot"} screenOptions={{
      headerTintColor: themeColors[appTheme].titleColor,
      presentation: "modal",

    }}>


      <Stack.Screen name="HomeRoot" component={Drawer} options={{ headerShown: false }} />
      <Stack.Screen name="FavoriteGenres" component={FavoriteGenres} options={{ headerShown: false }} />
      <Stack.Screen name="AddList" component={AddList}
                    options={{ headerShown: true, headerTransparent: true, title: i18n.t("newList") }} />
      <Stack.Screen name="FavoriteListOverview" component={FavoriteListOverview} options={({ route }) => ({
        title: i18n.t("favorites"),
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      })} />
      <Stack.Screen name="ListOverview" component={ListOverview} options={({ route }) => ({
        title: route.params.title,
        headerShown: true,
        headerTransparent: false,
        headerTitleStyle: { color: themeColors[appTheme].titleColor },
        headerStyle: { backgroundColor: themeColors[appTheme].backgroundColor },
        headerTintColor: themeColors[appTheme].titleColor,
        // headerRight: () => route.params.userId === user?._id &&
        //   <TouchableOpacity style={{ marginRight: normalize(10) }} hitSlop={50}><Feather name={"more-vertical"}
        //                                                                                  color={"white"}
        //                                                                                  size={20} /></TouchableOpacity>,
      })} />
      <Stack.Screen name="EditList" component={EditList} options={({ route }) => ({
        headerShown: false

      })} />
      <Stack.Screen name="EditEntries" component={EditEntries} options={({ route }) => ({
        headerShown: false,
        presentation: "transparentModal"
      })} />
      <Stack.Screen name="FindFilmToList" component={FindFilmToList} options={({ route }) => ({
        headerShown: false

      })} />
      <Stack.Screen name="AddFilmToList" component={AddFilmToList} options={({ route }) => ({
        headerShown: false,
        presentation: "transparentModal",
        title: route.params.title,
        item:route.params.item

      })} />
      <Stack.Screen name="FilmOverview" component={FilmOverview}

                    options={({ route }) => ({
                      headerTransparent: true,
                      title: route.params.title, id: route.params.id, headerShown: false,
                      // gestureEnabled: true,
                      transitionSpec: {
                        open: { config: { duration: 500 } },
                        close: { config: { duration: 400 } },
                      },
                      // headerBackTitleVisible: false,
                      // cardStyleInterpolator: ({ current: { progress } }) => {
                      //
                      //   return {
                      //     cardStyle: {
                      //       opacity: progress,
                      //     },
                      //   };
                      // },
                    })} />
      <Stack.Screen name="FilmReviews" component={FilmReviews}

                    options={({ route }) => ({
                      headerTransparent: true,
                      title: route.params.title, id: route.params.id, headerShown: false,

                      transitionSpec: {
                        open: { config: { duration: 500 } },
                        close: { config: { duration: 400 } },
                      },

                    })} />
      <Stack.Screen name="Profile" component={ProfileStack} options={({route}) => ({headerShown: false})}/>
    </Stack.Navigator>
  );
};

