import React, {useEffect} from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import {useAuth} from "../../providers/AuthProvider";
import NotificationModal from "./NotificationModal";
import {useSelector} from "react-redux";
import {setOpenNotification, setRefresh} from "../../redux/authReducer";

const ScreenWrapper = ({children,refreshing=()=>{},ref=null,isRefreshed}) => {

  const {
    openNotification,refresh
  } = useSelector((state) => state.auth);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    wait(500).then(() => {
      refreshing()
      setRefresh(!isRefreshed)

    });
  }, []);
  // useEffect(()=>{
  //   console.log(openNotification)
  // },[openNotification])
  return (
    <SafeAreaView  >
      {/*<StatusBar hidden={true}   translucent  />*/}
      {/*<NotificationModal  />*/}
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
        />
      } ref={ref}>

        {children}
      </ScrollView>

    </SafeAreaView>
  );
};

export default ScreenWrapper;
