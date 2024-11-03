import { useTheme } from "../providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { DrawerContent } from "../components/navigation/DrawerMenu";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Tabs from "./Tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { normalize } from "../responsive/fontSize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themeColors } from "./themeColors";
import { useGetUserListsQuery } from "../services/UserService";
import { useGetNotificationsQuery } from "../services/NotificationService";
import { useNavigation } from "@react-navigation/native";

const Draw = createDrawerNavigator();
const NotificationButton = (props) => {
  const {isDarkTheme,appTheme} = useTheme();
  const style=styles(themeColors[appTheme])
  const navigation=useNavigation()
  const { data, isLoading,refetch }=useGetNotificationsQuery()
  const [unreadCount, setUnreadCount] = useState(0)
  useEffect(()=>{

    data?.notifications.length&&setUnreadCount(data.notifications?.filter(item => !item?.isRead)?.length)
  },[data])
  return (
    <View style={style.notificationContainer}>

      <TouchableOpacity style={style.notificationButton} onPress={() => navigation.navigate("NotificationsScreen") }>
        {unreadCount > 0 &&
          <View style={style.count}><Text
            style={{color: 'white', fontSize: normalize(10)}}>{unreadCount}</Text></View>}
        <Ionicons name="notifications" color="white" size={normalize(26)}/>
      </TouchableOpacity>
    </View>
  );
}
export const Drawer = (props) => {
  const { appTheme} = useTheme();

  // console.log(props.navigation.getState().routes[0].state.routes[0].state.routes[0])
  return (
    <Draw.Navigator drawerContent={props => <DrawerContent {...props} />} defaultStatus="closed"
                    screenOptions={({route}) => ({

                      useNativeDriver: true,
                      headerStyle: {elevation: 0,backgroundColor:themeColors[appTheme].backgroundColor},
                      headerTitleStyle: {color: themeColors[appTheme].titleColor},
                      headerTintColor:themeColors[appTheme].titleColor,
                      drawerLabel: ({focused, color, size}) => {
                        return <Text>{route.name}</Text>
                      },

                      headerShown: true,
                      headerRight: (props) => <NotificationButton {...props}/>

                    })}
    >

      <Draw.Screen name="HomeTab" component={Tabs}
                   options={{
                     headerShown: true,
                     useNativeDriver: true,
                     title: 'Filmer',


                   }}/>

    </Draw.Navigator>
  );
}
const styles = (theme)=>StyleSheet.create({
  notificationContainer:{
    backgroundColor: 'red', position: 'absolute',
    top: 0
  },
  notificationButton:{
    backgroundColor: theme.notificationButtonBg,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    padding: normalize(15),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0
  },
  count:{
    position: 'absolute',
    left: 0,
    top: normalize(5),
    width: normalize(18),
    height: normalize(18),
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
