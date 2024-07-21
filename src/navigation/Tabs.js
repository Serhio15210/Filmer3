/* eslint-disable */
import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeFilmsScreen from "../pages/HomeFilmsScreen";
import CustomTabBar from "../components/navigation/CustomTabBar";


const Tab = createBottomTabNavigator();







export const Tabs = () => {

  const [selectedTab, setSelectedTab] = useState('Home');
  return (

    <Tab.Navigator initialRouteName={selectedTab} tabBar={(props)=><CustomTabBar {...props} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/> } screenOptions={{
      headerShown:false,
      gestureEnabled: false
    }}>
      <Tab.Screen name={"Home"} component={HomeFilmsScreen}   />


    </Tab.Navigator>
  );
};


export default Tabs;
