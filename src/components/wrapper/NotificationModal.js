import React, {useEffect, useState} from 'react';
import {View, Animated, Pressable, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {useSelector} from "react-redux";
import {getNotifications, readNotification} from "../../api/notifications";
import {MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import RateStars from "../UI/RateStars";
import {useTheme} from "../../providers/ThemeProvider";
import {themeColors} from "../../navigation/themeColors";

const NotificationModal = ({openNotification,setOpenNotification,setUnreadCount,unreadCount}) => {
  const [height, setHeight] = useState(new Animated.Value(0))
  const [width, setWidth] = useState(new Animated.Value(0))
  const [top, setTop] = useState(new Animated.Value(normalize(-40)))
  const navigation=useNavigation()
  const {i18n,appTheme}=useTheme()
  const style=styles(themeColors[appTheme])
  const {
    user, notifications
  } = useSelector((state) => state.auth);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: openNotification ? normalize(250) : 0,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(width, {
        toValue: openNotification ? normalize(250) : 0,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(top, {
        toValue: openNotification ? normalize(60) : normalize(-40),
        duration: 200,
        useNativeDriver: false
      })
    ]).start()
    if (openNotification){
      notifications?.slice(0,4).map(item=>{
        if (!item?.isRead){
          readNotification(item?._id)
          unreadCount!==0&&setUnreadCount(unreadCount-1)
        }
      })
    }
  }, [openNotification])

  return (
    <Animated.View style={{
      ...style.modalContainer,
      top: top,
      height: height,
      width: width,

    }}>
      <View style={style.block}>
        {notifications?.length === 0 ? <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{color: MAIN_GREY_FADE, textAlign: 'center'}}>{i18n.t('notificationNotFound')}</Text>
          </View> :
          <FlatList contentContainerStyle={{paddingVertical: normalize(5),paddingHorizontal:normalize(5)}}
                    style={{width:'100%'}}
                    data={notifications?.slice(0,4)}
                    renderItem={({item, index}) => {
                      return (
                        <Pressable style={style.notification} onPress={()=>{
                          if (item?.imdb_id){
                            setOpenNotification(false)
                            navigation.navigate('FilmOverview',{id:item?.imdb_id,title:item?.filmTitle})
                          }
                        }}>

                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{color: 'black', fontSize: normalize(12),fontWeight:'600'}}
                                  numberOfLines={item?.text?1:2}>{item?.title}</Text>
                            {item?.rate>0&&<RateStars rate={item?.rate} size={10}/>}
                          </View>

                          {item?.text && <Text style={{color: 'black',fontSize:normalize(10)}} numberOfLines={1}>{item?.text}</Text>}
                        </Pressable>
                      )
                    }}/>}
        {notifications?.length > 0 &&<TouchableOpacity onPress={()=>{
          setOpenNotification(false)
          navigation.navigate('Notifications')
        }}>
          <Text style={{color: 'black'}}>{i18n.t('allNotifications')}</Text>
        </TouchableOpacity>}

      </View>

    </Animated.View>
  );
};
const styles = (theme)=>StyleSheet.create({
  modalContainer:{
    position: 'absolute',
    right: normalize(10),
    backgroundColor: theme.backgroundColor,
    elevation: 5,
    borderRadius: 10,
    zIndex: 1000
  },
  block:{
    flex: 1, alignItems: 'center', paddingBottom: normalize(10)
  },
  notification:{
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_FADE,
    padding: normalize(10),
    marginBottom: normalize(15),
    width: '100%'
  }
})
export default NotificationModal;
