import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getUserFilms} from "../../api/films";
import Loading from "../../components/UI/Loading";
import {normalize} from "../../responsive/fontSize";
import SortDropdown from "../../components/SortDropdowns/SortDropdown";
import SortRateDropdown from "../../components/SortDropdowns/SortRateDropdown";
import {MAIN_GREY, MAIN_GREY_FADE, MAIN_RED, MAIN_SUCCESS} from "../../constants/colors";
import PageButtons from "../../components/UI/PageButtons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {FAVORITE_LIST_IMG, IMG_URI, UNKNOWN_IMG} from "../../api/apiKey";
import {AirbnbRating} from "react-native-ratings";
import {useSelector} from "react-redux";
import ListPreview from "../../components/UserLists/ListPreview";
import AntDesign from "react-native-vector-icons/AntDesign";
import unknown from "../../styles/unknown.png";
import {getUserList} from "../../api/lists";
import {setUserList} from "../../redux/authReducer";
import {useAuth} from "../../providers/AuthProvider";
import {useTheme} from "../../providers/ThemeProvider";

const AllListsScreen = ({navigation,route}) => {
  const [lists, setLists] = useState([])
  const {userList, user} = useSelector(state => state.auth)
  let scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollY] = useState(new Animated.Value(0));
  const {i18n}=useTheme()
  const [loading, setLoading] = useState(true)
  // const [totalPages, setTotalPages] = useState(1)
  // const [page, setPage] = useState(1)
  const scrolling = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    try {
      scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
      getUserList(route.params.id).then(res=>{
        if (res.success){
          setLists(res?.lists)
        }
        setLoading(false)
      })
    }catch (e) {
      setLoading(false)
    }finally {
      setLoading(false)
    }



  }, [])

  return (
    loading ? <Loading/> :
      <View style={styles.container}>

        {lists?.length === 0 ?
          <View style={styles.containerCenter}>
            <Text style={{color: MAIN_GREY_FADE}}>{i18n.t('listsNotFound')}</Text>
          </View>
          :
          <Animated.FlatList ref={scrollRef} data={lists} showsVerticalScrollIndicator={false}
                             onScroll={Animated.event(
                               [{nativeEvent: {contentOffset: {y: scrollY}}}],
                               {useNativeDriver: false, throttle: 16}
                             )}
                             scrollEventThrottle={16}
                             renderItem={({item}) => {
                               return (
                                 <List item={item} onPress={() => {
                                   console.log(route.params.id===user?._id)
                                   route.params.id===user?._id?navigation.navigate( 'ListOverview', {
                                     id: item?._id,
                                     title: item?.name
                                   }):
                                   navigation.navigate( 'UserListOverview', {
                                     id: item?._id,
                                     title: item?.name
                                   })
                                 }}/>

                               );
                             }}
          />}

        <Animated.View style={{...styles.up, opacity: scrolling}}>
          <TouchableOpacity onPress={() => {
            scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
          }}>
            <Ionicons name={'arrow-up'} color={'white'} size={30}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
  );
};
const List = ({item, onPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.listItem} onPress={onPress}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={{color:MAIN_GREY}}>{item?.films?.length} films</Text>
      </View>
      {item?.films?.length > 0 ?
        <FlatList horizontal showsHorizontalScrollIndicator={false} data={item?.films?.slice(0,10)} renderItem={({item,index})=>{
        return (

          <Image source={{uri: IMG_URI + item?.poster}} style={{
            width: normalize(90),
            height: normalize(140),
            // borderTopLeftRadius:index===0?5:0,
            // borderBottomLeftRadius:index===0?5:0,
            // borderTopRightRadius:index===item?.films?.slice(0,10)?.length+1?5:0,
            // borderBottomRightRadius:index===item?.films?.length?5:0
          }}/>
        )}
        }/>:
        // <Image source={item?.films?.length !== 0 ? unknown : {uri: IMG_URI + item?.films[0]?.poster}} style={{
        //   width: '100%',
        //   height: normalize(140),
        //   borderRadius: 10,
        //
        // }}/>
        <View style={{alignItems:'center',justifyContent:'center',height:'50%'}}>
          <Text style={{color:MAIN_GREY}}>Empty</Text>
        </View>

      }
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1, backgroundColor: 'white',
    padding:normalize(15),
  },
  containerCenter: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    fontSize: normalize(18),
    color: 'black',
    fontWeight: '500',
    marginBottom: 5
  },
  filmsRow: {
    flexDirection: 'row', alignItems: 'center', width: normalize(300), height: normalize(140)
  },
  up: {
    backgroundColor: MAIN_RED,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(60),
    height: normalize(60),
    position: 'absolute',
    right: normalize(15),
    bottom: normalize(15)
  },
listItem:{
  marginRight: normalize(30),
  width: '100%',
  borderBottomWidth:1,
  paddingBottom:normalize(5),
  borderColor:MAIN_GREY_FADE,
  height: normalize(140),
  marginBottom:normalize(10)
},
  rowBetween:{
    flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'
  }

})

export default AllListsScreen;
