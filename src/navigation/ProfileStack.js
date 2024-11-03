import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../pages/Profile/ProfileScreen";
import { useTheme } from "../providers/ThemeProvider";
import { useSelector } from "react-redux";
import AllFilmsScreen from "../pages/Profile/AllFilmsScreen";
import AllListsScreen from "../pages/Profile/AllListsScreen";
import ProfileActivities from "../pages/Profile/ProfileActivities";
import { BLACK } from "../constants/colors";


const Stack = createStackNavigator();
const ProfileStack = () => {
  const {i18n} = useTheme();
  const {user}=useSelector(state => state.auth)
  return (
    <Stack.Navigator  initialRouteName={'ProfileScreen'} screenOptions={{
      headerStyle: {
        backgroundColor:BLACK
      },headerTitleStyle:{color:'white', },headerTintColor:'white'
    }}>

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={({route}) => ({title: user.userName, headerShown: true, headerTransparent: true,})}/>
      <Stack.Screen name="ProfileActivities" component={ProfileActivities} options={({route}) => ({title: route.params.title, headerShown: true,headerTitleStyle:{color:'white', },headerTintColor:'white',headerStyle:{backgroundColor:BLACK}})}/>
      <Stack.Screen name="AllFilmsScreen" component={AllFilmsScreen} options={({route}) => ({title: user.userName, headerShown: true})}/>

    </Stack.Navigator>
  );
};

export default ProfileStack;
