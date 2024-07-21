import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useTheme} from "../../providers/ThemeProvider";
import {useAuth} from "../../providers/AuthProvider";
import {addFilmToList, deleteFromList, deleteListById, getListById, renameList} from "../../api/lists";
import {
  ActivityIndicator,
  Animated, Dimensions,
  FlatList, Image,
  ImageBackground, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {normalize} from "../../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import RateInfoModal from "../../components/filmModals/RateInfoModal";
import FindFilmModal from "../../components/filmModals/FindFilmModal";
import Feather from "react-native-vector-icons/Feather";
import {MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FilmItem from "../../components/Films/FilmItem";
import {IMG_URI} from "../../api/apiKey";
import LinearGradient from "react-native-linear-gradient";
import AwesomeAlert from "react-native-awesome-alerts";
import unknown from "../../styles/unknown.png";
import Collage from "../../components/Lists/Collage";
import OneImage from "../../components/Lists/OneImage";

const UserListOverview = ({route}) => {
  const {
    user, refresh, userList
  } = useSelector((state) => state.auth);
  const {id, title} = route.params;
  const [loading, setLoading] = useState(true);
  const [isAddFilm, setIsAddFilm] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [openEditFilm, setOpenEditFilm] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [listName, setListName] = useState(title || '')

  const [listData, setListData] = useState({})
  const [selectFilm, setSelectFilm] = useState({})
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {isDarkTheme,i18n} = useTheme()
  const {getUserLists} = useAuth()
  let row = []
  let swipe
  const getList = () => {
    getListById(id).then(res => {
      if (res.success) {
        setListData(res?.list)
        setLoading(false)
      }

    })
  }
  useEffect(() => {
     getList()

  }, [])
  return (
    loading ?
      <View style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={isDarkTheme ? "#DAA520" : "#DC143C"}/></View> :

      <View style={styles.container}>
        <View>
          {listData?.films?.length < 4 ?
            <OneImage listData={listData} name={listName}/> : <Collage listData={listData} name={listName}/>
          }

        </View>
        <View style={{paddingHorizontal: normalize(15), flex: 1}}>
          <Text
            style={{...styles.imgTitle, color: 'black', fontWeight: '600', marginBottom: normalize(20)}}>{i18n.t('films')}:</Text>
          {listData?.films?.length === 0 ?
            <TouchableOpacity style={styles.addBlock} onPress={() => setIsAddFilm(true)}>
              {/*<Text style={{textAlign: 'center', alignItems: 'center',color:'white',fontSize:normalize(18)}}>Add films </Text>*/}
              <Ionicons name={'add-circle-outline'} size={50} color={MAIN_GREY_FADE}/>
            </TouchableOpacity> :

            <FlatList data={listData?.films}
                      maxToRenderPerBatch={3}
                      contentContainerStyle={{alignItems: 'center', paddingBottom: normalize(100)}}
                      renderItem={({item, index}) => {
                        return <TouchableOpacity style={styles.block} onPress={()=>{
                          if (item?.isSerial){
                            navigation.navigate('SerialOverview',{title:item.title,id:item?.imdb_id})
                          }else navigation.navigate('FilmOverview',{title:item.title,id:item?.imdb_id})

                        }}>
                          <Image
                            source={item?.poster?.length !== 0 && item?.poster !== null ? {uri: IMG_URI + item.poster} : unknown}
                            style={styles.img} resizeMode="cover"/>
                          <View style={{flex:1, paddingHorizontal: normalize(15),width:'100%'}}>
                            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>{item.title}</Text>
                            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                              <View style={styles.row} >
                                <AntDesign name="star" size={30} style={{marginRight: normalize(15)}}
                                           color={item?.rate > 0 ? "#FFD700" : MAIN_GREY_FADE}/>
                                <Text
                                  style={styles.rate}>{`${item?.rate}/5`}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      }
                      }/>

          }

        </View>

      </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  imageBg: {
    height: normalize(300), width: '100%', flexDirection: 'row', justifyContent: 'center',backgroundPositionX: "50%",
    backgroundPositionY: "50%",
  },
  imgTitleRow: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: normalize(15),
    position: 'absolute', bottom: 0, zIndex: 2
  },
  imgTitle: {
    color: 'white', fontSize: normalize(24), marginRight: normalize(10)
  },
  white16: {
    color: 'white', fontSize: normalize(16)
  },
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

export default UserListOverview;
